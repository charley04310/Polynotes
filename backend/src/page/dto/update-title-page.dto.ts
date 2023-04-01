import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePageDto } from './create-page.dto';

export class UpdateTitlePageDto extends PartialType(CreatePageDto) {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
