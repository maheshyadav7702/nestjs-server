import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class UpdateDto{
    @IsOptional()
    @IsString()
    readonly name:string
  
   @IsOptional()
    @IsString()
    readonly email:string

     @IsOptional()
    @IsString()
    readonly city:string

     @IsOptional()
    @IsString()
    readonly state:string

     @IsOptional()
    @IsString()
    readonly pin : string
}