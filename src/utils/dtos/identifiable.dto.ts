import { IsNotEmpty, IsString } from 'class-validator';

export class IdentifiableDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
