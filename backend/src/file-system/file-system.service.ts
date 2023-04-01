import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateFileSystemDto } from './dto/create-file-system.dto';
import { FileSystemTreeDocument } from './schemas/file-system.schema';
import { FileSystemTree } from './schemas/file-system.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileSystemService {
  constructor(
    @InjectModel(FileSystemTree.name)
    private fileSystemModel: Model<FileSystemTreeDocument>,
    private usersService: UsersService,
  ) {}

  async create(
    createFileSystemDto: CreateFileSystemDto,
  ): Promise<FileSystemTreeDocument> {
    const { userId, ...fileSystemData } = createFileSystemDto;

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let fileSystem = await this.fileSystemModel.findOne({ userId }).exec();
    if (!fileSystem) {
      fileSystem = new this.fileSystemModel({ userId });
    }
    fileSystem.set(fileSystemData);
    return await fileSystem.save();
  }

  async getTree(id: string): Promise<FileSystemTreeDocument> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fileSystemUser = await this.fileSystemModel
      .findOne({ userId: id })
      .exec();

    if (!fileSystemUser) {
      const newFileSystem = await this.create({
        userId: id,
        title: 'Home',
        key: uuidv4(),
        children: [],
      });

      if (!newFileSystem) throw new Error('Error creating file system tree.');

      await this.fileSystemModel.findOne({ userId: id }).exec();
      return newFileSystem;
    }

    return fileSystemUser;
  }
}
