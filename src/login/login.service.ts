import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './schemas/login.schema';
import * as Mongoose  from 'mongoose';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(Login.name)
        private loginModel:Mongoose.Model<Login>
    ){}

    async findAll():Promise<Login[]>{
        const users = await this.loginModel.find()
        return users;
    }

    async createLogin(data):Promise<any>{
        const res = await this.loginModel.create(data)
        return res
    }
}
