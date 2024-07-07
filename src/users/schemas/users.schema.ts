import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema ({
    timestamps:true,
})

export class Users {
    @Prop()
    name:string;

    @Prop()
    email:string

    @Prop()
    city:string

    @Prop()
    state:string

    @Prop()
    pin: string

}

export const UserSchema = SchemaFactory.createForClass(Users)