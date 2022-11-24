import { ApiExtraModels, ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
