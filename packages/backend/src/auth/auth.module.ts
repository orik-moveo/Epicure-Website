import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}