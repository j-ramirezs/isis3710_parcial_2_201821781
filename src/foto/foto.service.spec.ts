import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
// import { Repository } from 'typeorm';
// import { FotoEntity } from './foto.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
// import { getRepositoryToken } from '@nestjs/typeorm';

describe('FotoService', () => {
  let service: FotoService;
  // let repository: Repository<FotoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    // repository = module.get<Repository<FotoEntity>>(
    //   getRepositoryToken(FotoEntity),
    // );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
