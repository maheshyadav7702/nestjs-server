import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})

export class Login {
    @Prop()
    email: string

    @Prop()
    password: string
}

export const LoginSchema = SchemaFactory.createForClass(Login)