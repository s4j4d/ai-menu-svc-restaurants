import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdentifiableDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: 'cd6bb0b3-41af-42b0-986a-3eb0747da771',
  })
  id: string;
}
