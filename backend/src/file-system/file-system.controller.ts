import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { FileSystemService } from './file-system.service';
import { CreateFileSystemDto } from './dto/create-file-system.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('file-system')
export class FileSystemController {
  constructor(private readonly fileSystemService: FileSystemService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/tree/create-or-update')
  create(
    @Req() req: Request,
    @Body() createFileSystemDto: CreateFileSystemDto,
  ) {
    const userId = req.user['userId'];
    createFileSystemDto.userId = userId;

    return this.fileSystemService.create(createFileSystemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tree/:id')
  getTree(@Req() req: Request, @Param('id') id: string) {
    const token = req.user['userId'];
    if (token !== id) {
      throw new UnauthorizedException('Unauthorized');
    } else {
      return this.fileSystemService.getTree(id);
    }
  }
}
