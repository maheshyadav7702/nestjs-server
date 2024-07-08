import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { UpdateDto } from './dto/update.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('users')
export class UsersController {
  constructor(private userModel: UsersService) {}

  @Get()
  // get all users with serarch and pagination
  async getAllUsers(@Query() query: ExpressQuery) {
    return this.userModel.getAllUsers(query);
  }

  @Post()
  async create(@Body() data: UsersDto) {
    return this.userModel.createuser(data);
  }

  @Get(':id')
  async getById(@Param('id') id: any): Promise<any> {
    return this.userModel.getById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: any, @Body() data: UpdateDto) {
    return this.userModel.updateById(id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: any) {
    return this.userModel.deleteById(id);
  }
}
