import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumsList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear;
    albumsList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await repository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        titulo: faker.lorem.word(),
        fotos: [],
      });
      albumsList.push(album);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
