import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    usuariosList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.person.firstName(),
        telefono: faker.string.numeric(10),
      });
      usuariosList.push(usuario);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUsuario should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      nombre: faker.company.name(),
      telefono: faker.string.numeric(10),
      redSocial: null,
      fotos: [],
    };

    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({
      where: { id: newUsuario.id },
    });
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.id).toEqual(newUsuario.id);
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre);
    expect(storedUsuario.telefono).toEqual(newUsuario.telefono);
  });

  it('createUsuario should throw an exception for a usuario with invalid telefono', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      nombre: faker.company.name(),
      telefono: faker.string.numeric({ length: { min: 1, max: 9 } }),
      redSocial: null,
      fotos: [],
    };

    await expect(service.createUsuario(usuario)).rejects.toHaveProperty(
      'message',
      "The usuario's telefono must have 10 characters",
    );
  });

  it('findAllUsuarios should return a list of usuarios', async () => {
    const usuarios: UsuarioEntity[] = await service.findAllUsuarios();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuariosList.length);
  });

  it('findUsuarioById should return an usuario by id', async () => {
    const storedUsuario: UsuarioEntity = usuariosList[0];
    const usuario: UsuarioEntity = await service.findUsuarioById(
      storedUsuario.id,
    );
    expect(usuario).not.toBeNull();
    expect(usuario.id).toEqual(storedUsuario.id);
    expect(usuario.nombre).toEqual(storedUsuario.nombre);
    expect(usuario.telefono).toEqual(storedUsuario.telefono);
  });

  it('findUsuarioById should throw an exception for an invalid usuario', async () => {
    await expect(service.findUsuarioById('0')).rejects.toHaveProperty(
      'message',
      'The usuario with the given id was not found',
    );
  });
});
