import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class AlbumDto {
  @Column()
  @IsISO8601()
  readonly fechaInicio: Date;

  @Column()
  @IsISO8601()
  readonly fechaFin: Date;

  @IsString()
  @IsNotEmpty()
  readonly titulo: string;
}
