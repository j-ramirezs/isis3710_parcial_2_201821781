import { Injectable } from '@nestjs/common';
import { FotoEntity } from './foto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async createFoto(foto: FotoEntity): Promise<FotoEntity> {
    if (foto.ISO < 100 || foto.ISO > 6400) {
      throw new BusinessLogicException(
        'Invalid ISO',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (foto.velObturacion < 2 || foto.velObturacion > 250) {
      throw new BusinessLogicException(
        'Invalid velObturacion',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    if (foto.apertura < 1 || foto.apertura > 32) {
      throw new BusinessLogicException(
        'Invalid apertura',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    const medioISO = (100 + 6400) / 2;
    const medioVelObturacion = (2 + 250) / 2;
    const medioApertura = (1 + 32) / 2;

    let valoresPorEncimaDelMedio = 0;

    if (foto.ISO > medioISO) {
      valoresPorEncimaDelMedio++;
    }

    if (foto.velObturacion > medioVelObturacion) {
      valoresPorEncimaDelMedio++;
    }

    if (foto.apertura > medioApertura) {
      valoresPorEncimaDelMedio++;
    }

    if (valoresPorEncimaDelMedio > 2) {
      throw new BusinessLogicException(
        'Máximo 2 valores deben estar por encima del valor medio de sus cotas',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.fotoRepository.save(foto);
  }

  async findFotoById(id: string): Promise<FotoEntity> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
      relations: ['usuario', 'album'],
    });
    if (!foto)
      throw new BusinessLogicException(
        'The foto with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return foto;
  }

  async findAllFotos(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find({
      relations: ['usuario', 'album'],
    });
  }

  async deleteFoto(id: string) {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id },
      relations: ['album'],
    });
    if (!foto)
      throw new BusinessLogicException(
        'The foto with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    const album: AlbumEntity | undefined = foto.album;

    await this.fotoRepository.remove(foto);

    if (album) {
      const albumConFotos = await this.albumRepository.findOne({
        where: { id: album.id },
        relations: ['fotos'],
      });

      if (albumConFotos && albumConFotos.fotos.length === 0) {
        await this.albumRepository.remove(albumConFotos);
      }
    }
  }
}
