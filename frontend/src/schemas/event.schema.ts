import { IsString, IsOptional, Matches } from 'class-validator';

export class EventSchema {
  @IsString()
  name!: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, {
    message: 'date must match YYYY-MM-DDTHH:MM:SS format',
  })
  date!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  place?: string;
}
