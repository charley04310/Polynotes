import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Page {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: ObjectId;

  @Prop({
    required: false,
  })
  parent: string | null;

  @Prop({ required: true })
  content: [];
}

export const PageSchema = SchemaFactory.createForClass(Page);
