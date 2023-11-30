import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { FotoEntity } from 'src/foto/foto.entity';
import { RedSocialEntity } from 'src/red-social/red-social.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AlbumEntity, FotoEntity, RedSocialEntity, UsuarioEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    AlbumEntity,
    FotoEntity,
    RedSocialEntity,
    UsuarioEntity,
  ]),
];
