import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Req } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*   @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
 */
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user['userId'];
    if (userId !== id) {
      throw new Error('Unauthorized');
    }
    return this.usersService.findOne(userId);
  }

  /*  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  } */
}
