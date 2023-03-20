import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}
  async create(createPageDto: CreatePageDto): Promise<PageDocument> {
    const { title, content, user_id } = createPageDto;
    const page = new this.pageModel({
      title,
      content,
      user_id,
    });
    return page.save();
  }

  async findPageByUserId(userId: string): Promise<PageDocument[]> {
    return this.pageModel
      .find({ user_id: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
