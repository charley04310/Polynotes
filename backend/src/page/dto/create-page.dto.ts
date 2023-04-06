import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
export class CreatePageDto {
  readonly pageId: ObjectId;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly content: [];
}
