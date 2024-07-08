import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose'; // Import the correct type for Model
import { Users } from './schemas/users.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>, // Use 'readonly' for better safety
  ) {}

  // get all users with serarch and pagination
  async getAllUsers(query: Query): Promise<Users[]> {

const rowsPerpage:any = query.rowsPerpage;
const currentPage:any = query.currentPage || 1;
const skip:any = rowsPerpage * (currentPage - 1)

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    return await this.userModel.find({ ...keyword }).limit(rowsPerpage).skip(skip).exec(); // Add '.exec()' for better error handling
  }

  async createuser(data: any): Promise<any> {
    const res = await this.userModel.create(data);
    return res;
  }

  async getById(id: any): Promise<any> {

    const isValidId = mongoose.isValidObjectId(id) // when pass the invalid id

    if (!isValidId) {
      throw new BadRequestException('Please enter valid id');
    }
    const res = await this.userModel.findById(id);
    if (!res) {
      throw new NotFoundException('not found');
    }
    return res;
  }

  async updateById(id: any, body: any): Promise<any> {
    const res = await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!res) {
      throw new NotFoundException('not found');
    }
    return res;
  }

  async deleteById(id: any): Promise<any> {
    const res = await this.userModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('not found');
    }
    return res;
  }
}
