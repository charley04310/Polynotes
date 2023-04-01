import { Module } from '@nestjs/common';
import { FileSystemService } from './file-system.service';
import { FileSystemController } from './file-system.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FileSystemTree,
  FileSystemTreeSchema,
} from './schemas/file-system.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: FileSystemTree.name,
        schema: FileSystemTreeSchema,
      },
    ]),
  ],
  controllers: [FileSystemController],
  providers: [FileSystemService],
})
export class FileSystemModule {}
