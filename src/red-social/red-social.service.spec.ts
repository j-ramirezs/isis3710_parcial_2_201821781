import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('RedSocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;
  let redesSocialesList: RedSocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(
      getRepositoryToken(RedSocialEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    redesSocialesList = [];
    for (let i = 0; i < 5; i++) {
      const redSocial: RedSocialEntity = await repository.save({
        nombre: faker.lorem.word(),
        slogan: faker.lorem.words(10),
        usuarios: [],
      });
      redesSocialesList.push(redSocial);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
