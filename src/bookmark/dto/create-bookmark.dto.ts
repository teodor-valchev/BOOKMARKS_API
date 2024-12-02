import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookMarkDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  link: string;
}
