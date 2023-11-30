import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
})
export class RedSocialModule {}
