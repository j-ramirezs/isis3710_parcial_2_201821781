import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    if (usuario.telefono.length != 10) {
      throw new BusinessLogicException(
        "The usuario's telefono must have 10 characters",
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.usuarioRepository.save(usuario);
  }

  async findUsuarioById(id: string): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['redSocial', 'fotos'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'The usuario with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return usuario;
  }

  async findAllUsuarios(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find({
      relations: ['redSocial', 'fotos'],
    });
  }
}
