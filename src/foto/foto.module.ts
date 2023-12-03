import { Module } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { FotoController } from './foto.controller';

@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([FotoEntity, AlbumEntity])],
  controllers: [FotoController],
})
export class FotoModule {}
