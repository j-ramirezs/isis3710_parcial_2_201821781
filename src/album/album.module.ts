import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
  controllers: [AlbumController],
})
export class AlbumModule {}
