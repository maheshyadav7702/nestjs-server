import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Auth {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
