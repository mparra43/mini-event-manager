import {
  IsString,
  IsOptional,
  IsISO8601,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @IsISO8601({ strict: true })
  @IsOptional()
  @IsNotEmpty()
  date?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  place?: string;
}
