import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Page {
  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
  })
  user_id: string;

  @Prop({ required: true })
  content: [];
}

export const PageSchema = SchemaFactory.createForClass(Page);
