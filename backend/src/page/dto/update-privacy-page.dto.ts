import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';
import { IsBoolean } from 'class-validator';

export class UpdatePrivacyPageDto extends PartialType(CreatePageDto) {
  @IsBoolean()
  readonly isPublic: boolean;
  @IsBoolean()
  readonly isEditable: boolean;
}
