import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class FotoDto {
  @IsNumber()
  @IsNotEmpty()
  readonly ISO: number;

  @IsNumber()
  @IsNotEmpty()
  readonly velObturacion: number;

  @IsNumber()
  @IsNotEmpty()
  readonly apertura: number;

  @IsISO8601()
  @IsNotEmpty()
  readonly fecha: Date;
}
