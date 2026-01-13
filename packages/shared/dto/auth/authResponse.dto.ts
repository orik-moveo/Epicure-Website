import { AuthUserDto } from "./authUser.dto";

export class AuthResponseDto {
  token!: string;
  user!: AuthUserDto;
}
