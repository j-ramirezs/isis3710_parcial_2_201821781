import { Module } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { RedSocialEntity } from './red-social.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialController } from './red-social.controller';

@Module({
  providers: [RedSocialService],
  imports: [TypeOrmModule.forFeature([RedSocialEntity])],
  controllers: [RedSocialController],
})
export class RedSocialModule {}
