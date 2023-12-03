import { IsNotEmpty, IsString } from 'class-validator';

export class RedSocialDto {
  @IsString()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly slogan: string;
}
