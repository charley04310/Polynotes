import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { UpdatePrivacyPageDto } from './dto/update-privacy-page.dto';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}
  async createOrReturnExistingPage(
    userId: string,
    createPageDto: CreatePageDto,
  ): Promise<PageDocument> {
    const { pageId, title, content } = createPageDto;

    if (pageId != null) {
      const page = await this.pageModel.findById(pageId).exec();
      if (page) {
        return page;
      }
    }
    const page = new this.pageModel({
      title,
      content,
      userId,
    });
    await page.save();
    return page;
  }

  async findPageByUserId(userId: string): Promise<PageDocument[]> {
    return this.pageModel
      .find({ userId })
      .select('title _id')
      .sort({ created: -1 })
      .limit(10)
      .exec();
  }

  async findOneById(id: string) {
    const page = await this.pageModel.findById(id).exec();
    return page;
  }

  findAll() {
    return this.pageModel.find().exec();
  }

  async updatePageContent(
    pageId: string,
    updateDto: UpdatePageDto,
  ): Promise<any> {
    const page = await this.pageModel.findById(pageId);
    if (!page) {
      throw new NotFoundException('Page not found');
    }
    page.content = updateDto.content;
    return page.save();
  }

  async updatePageTitle(
    pageId: string,
    newTitle: string,
  ): Promise<PageDocument> {
    console.log('pageId', pageId);
    const updatedPage = await this.pageModel.findByIdAndUpdate(
      pageId,
      { title: newTitle.replace(/\s/g, '_') },
      { new: true },
    );
    return updatedPage;
  }

  async updatePrivacy(
    pageId: string,
    userId: string,
    updatePrivacy: UpdatePrivacyPageDto,
  ) {
    const page = await this.pageModel.findById(pageId);
    if (!page) {
      throw new Error('Page not found');
    }
    if (page.userId.toString() !== userId) {
      throw new UnauthorizedException("You don't have permission");
    }
    page.isPublic = updatePrivacy.isPublic;
    page.isEditable = updatePrivacy.isEditable;
    return page.save();
  }
}
