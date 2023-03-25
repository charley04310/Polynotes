import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTitlePageDto } from './dto/update-title-page.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('add')
  async create(@Body() createPageDto: CreatePageDto) {
    return await this.pageService.createOrReturnExistingPage(createPageDto);
  }
  @Get('all')
  async findAll() {
    return await this.pageService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findPageByUserId(@Param('id') id: string) {
    return await this.pageService.findPageByUserId(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOneById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.updatePageContent(id, updatePageDto);
  }
  @Patch('title/:id')
  updateTitle(
    @Param('id') id: string,
    @Body() updateTitlePageDto: UpdateTitlePageDto,
  ) {
    return this.pageService.updatePageTitle(id, updateTitlePageDto.title);
  }

  /*   @Put(':id')
  updatePut(@Param('id') id: string, @Body() createPageDto: CreatePageDto) {
    return this.pageService.updatePage(id, createPageDto);
  } */
  /* 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  } */
}
