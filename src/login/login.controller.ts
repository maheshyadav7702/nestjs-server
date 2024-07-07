import { Body, Controller,Get,Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){}

    @Get()
    async getLoginDetails(){
        return 'hello'
    }

    @Post()
    async createlogin(@Body() data:LoginDto){
        return this.loginService.createLogin(data)
    }
}
