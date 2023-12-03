import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { RedSocialDto } from './red-social.dto';
import { RedSocialEntity } from './red-social.entity';
import { plainToInstance } from 'class-transformer';

@Controller('redes-sociales')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedSocialController {
  constructor(private readonly redSocialService: RedSocialService) {}

  @Post()
  async createRedSocial(@Body() redSocialDto: RedSocialDto) {
    const redSocial: RedSocialEntity = plainToInstance(
      RedSocialEntity,
      redSocialDto,
    );
    return await this.redSocialService.createRedSocial(redSocial);
  }
}
