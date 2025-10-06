import { IsString } from 'class-validator';

export class SetPasswordDTO {
  @IsString()
  readonly password?: string;
}
