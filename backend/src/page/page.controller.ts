import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('add')
  async create(@Body() createPageDto: CreatePageDto) {
    return await this.pageService.create(createPageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async findPageByUserId(@Param('id') id: string) {
    return await this.pageService.findPageByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
