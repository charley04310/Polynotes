import { IsNotEmpty, IsString } from 'class-validator';
import { NodeFileNavigator } from '../entities/file-system.entity';

export class CreateFileSystemDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  children: NodeFileNavigator[];
}
