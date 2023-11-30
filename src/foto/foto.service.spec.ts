import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        ISO: 200,
        velObturacion: 100,
        apertura: 15,
        fecha: faker.date.past(),
      });
      fotosList.push(foto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new foto', async () => {
    const foto: FotoEntity = {
      id: '',
      ISO: 200,
      velObturacion: 100,
      apertura: 15,
      fecha: faker.date.past(),
      usuario: null,
      album: null,
    };

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: newFoto.id },
    });
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.ISO).toEqual(newFoto.ISO);
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion);
    expect(storedFoto.apertura).toEqual(newFoto.apertura);
    expect(storedFoto.fecha).toEqual(newFoto.fecha);
  });
});
