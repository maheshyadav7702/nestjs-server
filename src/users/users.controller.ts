import { Controller,Get,Body,Post, Param,Put,Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { UpdateDto } from './dto/update.dto';



@Controller('users')
export class UsersController {
 constructor(private userModel:UsersService){}

 @Get()
 async getAllUsers(){
    return this.userModel.getAllUsers()
 }

 @Post()
 async create(@Body() data:UsersDto){
   return this.userModel.createuser(data)
 }

 @Get(':id')
 async getById(@Param('id') id:any):Promise<any>{
   return  this.userModel.getById(id)
 }

  @Put(':id')
 async updateById( @Param('id') id:any, @Body() data:UpdateDto){
   return this.userModel.updateById(id, data)
 }

   @Delete(':id')
 async deleteById( @Param('id') id:any){
   return this.userModel.deleteById(id)
 }
}
