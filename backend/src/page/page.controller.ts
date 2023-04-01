import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTitlePageDto } from './dto/update-title-page.dto';
import { Request } from 'express';
import { UpdatePrivacyPageDto } from './dto/update-privacy-page.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async create(@Req() req: Request, @Body() createPageDto: CreatePageDto) {
    const userId = req.user['userId'];
    return await this.pageService.createOrReturnExistingPage(
      userId,
      createPageDto,
    );
  }

  /*   @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@Req() req: Request) {
    const userId = req.user['userId'];
    return await this.pageService.findAll();
  } */
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findPageByUserId(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user['userId'];
    if (userId !== id) {
      throw new Error('Unauthorized');
    }
    return await this.pageService.findPageByUserId(userId);
  }
  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    //   const userId = req.user['userId'];
    const page = await this.pageService.findOneById(id);
    // const pageUserId = page.userId.toString();

    /*  if (pageUserId !== userId) {
      throw new Error('Unauthorized');
    } */
    return page;
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return this.pageService.updatePageContent(id, updatePageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('privacy/:id')
  updatePrivacy(
    @Req() req: Request,
    @Param('id') pageId: string,
    @Body() updatePrivacyPageDto: UpdatePrivacyPageDto,
  ) {
    const userId = req.user['userId'];

    return this.pageService.updatePrivacy(pageId, userId, updatePrivacyPageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('title/:id')
  updateTitle(
    @Param('id') id: string,
    @Body() updateTitlePageDto: UpdateTitlePageDto,
  ) {
    return this.pageService.updatePageTitle(id, updateTitlePageDto.title);
  }
}
