import { PartialType } from '@nestjs/mapped-types';
import { SignAuthDto } from './sign-auth.dto';

export class UpdateAuthDto extends PartialType(SignAuthDto) {}
