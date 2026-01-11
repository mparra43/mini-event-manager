import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsISO8601,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsISO8601({ strict: true })
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  place?: string;
}
