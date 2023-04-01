import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NodeFileNavigator } from '../entities/file-system.entity';

export type FileSystemTreeDocument = FileSystemTree & Document;

@Schema()
export class FileSystemTree {
  @Prop({ required: true, unique: true })
  userId: string;
  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    unique: true,
  })
  key: string;

  @Prop({ required: true })
  children: NodeFileNavigator[];
}

export const FileSystemTreeSchema =
  SchemaFactory.createForClass(FileSystemTree);
