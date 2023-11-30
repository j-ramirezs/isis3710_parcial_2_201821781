import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private readonly redSocialRepository: Repository<RedSocialEntity>,
  ) {}

  async createRedSocial(redSocial: RedSocialEntity): Promise<RedSocialEntity> {
    if (
      !redSocial.slogan ||
      !redSocial.slogan.trim ||
      redSocial.slogan.length < 20
    ) {
      throw new BusinessLogicException(
        'The red social slogan must not be empty and have at least 20 characters',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.redSocialRepository.save(redSocial);
  }
}
