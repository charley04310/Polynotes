import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsNotEmpty()
  readonly content: [];
}
