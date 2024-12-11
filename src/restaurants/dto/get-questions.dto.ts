import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Metadata } from '../../utils/interfaces/metadata.interface';

export class GetQuestionsDto {
  @IsOptional()
  @ApiHideProperty()
  __meta?: Metadata;
}
