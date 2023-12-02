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

  it('createRedSocial should return a new red social', async () => {
    const redSocial: RedSocialEntity = {
      id: '',
      nombre: faker.company.name(),
      slogan: faker.lorem.sentence(10),
      usuarios: [],
    };

    const newRedSocial: RedSocialEntity =
      await service.createRedSocial(redSocial);
    expect(newRedSocial).not.toBeNull();

    const storedRedSocial: RedSocialEntity = await repository.findOne({
      where: { id: newRedSocial.id },
    });
    expect(storedRedSocial).not.toBeNull();
    expect(storedRedSocial.id).toEqual(newRedSocial.id);
    expect(storedRedSocial.nombre).toEqual(newRedSocial.nombre);
    expect(storedRedSocial.slogan).toEqual(newRedSocial.slogan);
  });

  it('createRedSocial should throw an exception for a redSocial with invalid slogan', async () => {
    const redSocial: RedSocialEntity = {
      id: '',
      nombre: faker.company.name(),
      slogan: faker.lorem.word({ strategy: 'shortest' }),
      usuarios: [],
    };

    await expect(service.createRedSocial(redSocial)).rejects.toHaveProperty(
      'message',
      'The red social slogan must not be empty and have at least 20 characters',
    );
  });
});
