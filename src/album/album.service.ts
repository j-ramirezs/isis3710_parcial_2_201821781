import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { FotoEntity } from '../foto/foto.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
  ) {}

  async createAlbum(album: AlbumEntity) {
    if (!album.titulo || !album.titulo.trim()) {
      throw new BusinessLogicException(
        'The album title can not be empty',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.albumRepository.save(album);
  }

  async findAlbumById(id: string): Promise<AlbumEntity> {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
      relations: ['fotos'],
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return album;
  }

  async addPhotoToAlbum(fotoId: string, albumId: string): Promise<boolean> {
    const foto: FotoEntity = await this.fotoRepository.findOne({
      where: { id: fotoId },
      relations: ['usuario', 'album'],
    });
    if (!foto) {
      throw new BusinessLogicException(
        'Can not add foto to album. The foto with the given id does not exist',
        BusinessError.NOT_FOUND,
      );
    }

    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['fotos'],
    });
    if (!album) {
      throw new BusinessLogicException(
        'Can not add foto to album. The album with the given id does not exist',
        BusinessError.NOT_FOUND,
      );
    }

    if (foto.fecha < album.fechaInicio || foto.fecha > album.fechaFin) {
      throw new BusinessLogicException(
        'Foto date must be between album start and end date',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    foto.album = album;
    album.fotos = [...album.fotos, foto];

    await this.albumRepository.save(album);
    await this.fotoRepository.save(foto);

    return true;
  }

  async deleteAlbum(id: string) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
      relations: ['fotos'],
    });
    if (!album)
      throw new BusinessLogicException(
        'The album with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (album.fotos && album.fotos.length > 0) {
      throw new BusinessLogicException(
        'The album can not be deleted because it has associated fotos',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    await this.albumRepository.remove(album);
  }
}
