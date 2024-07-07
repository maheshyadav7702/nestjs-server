import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Import the correct type for Model
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>, // Use 'readonly' for better safety
  ) {}

  async getAllUsers(): Promise<Users[]> {
    return await this.userModel.find().exec(); // Add '.exec()' for better error handling
  }

  async createuser(data:any):Promise<any>{
    const res = await this.userModel.create(data)
    return res;
  }

  async getById(id:any):Promise<any>{
    const res = await this.userModel.findById(id)
    if(!res){
         throw new NotFoundException('not found')
    }
    return res;
  }

  
  async updateById(id:any, body:any):Promise<any>{
    const res = await this.userModel.findByIdAndUpdate(id, body, {
        new:true,
        runValidators:true
    })
    if(!res){
         throw new NotFoundException('not found')
    }
    return res;
  }

  async deleteById(id:any):Promise<any>{
    const res = await this.userModel.findByIdAndDelete(id)
    if(!res){
         throw new NotFoundException('not found')
    }
    return res;
  }
}
