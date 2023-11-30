import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsuarioService],
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
})
export class UsuarioModule {}
