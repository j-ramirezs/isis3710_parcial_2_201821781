import { IsNumberString, IsString } from 'class-validator';

export class UsuarioDto {
  @IsString()
  readonly nombre: string;

  @IsNumberString()
  readonly telefono: string;
}
