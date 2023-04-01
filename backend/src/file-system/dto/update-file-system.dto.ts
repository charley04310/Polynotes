import { PartialType } from '@nestjs/mapped-types';
import { CreateFileSystemDto } from './create-file-system.dto';

export class UpdateFileSystemDto extends PartialType(CreateFileSystemDto) {}
