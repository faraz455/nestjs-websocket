import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { Request } from "express";
import * as md5 from "md5";
import { Profile } from "./dto";
import { PRISMA_SERVICE } from "../multi-tenant/multi-tenant.module";
import { SignupDto } from "./dto/signup.dto";
import { MakeTimedIDUnique } from "src/common/common.helper";

@Injectable()
export class AuthService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(req: Request) {
    let userName: string = req.body.userName;
    let pass: string = req.body.password;

    if (!userName || !pass) {
      throw new BadRequestException("Login request malformed");
    }

    const hashPassword = md5(pass);
    const user = await this.prisma.user.findFirst({
      select: {
        userId: true,
        userName: true,
        fullName: true,
      },
      where: { userName: userName, password: hashPassword },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(userInfo: User) {
    const profile = new Profile(
      userInfo.userId,
      userInfo.fullName,
      userInfo.userName
    );

    const payload = {
      profile,
    };

    const encodedJWT = this.jwtService.sign(payload);

    const load = {
      profile,
      auth_token: encodedJWT,
    };

    return load;
  }

  async signup(userInfo: SignupDto) {
    const userId = MakeTimedIDUnique();

    const hashPassword = md5(userInfo.password);

    await this.prisma.user.create({
      data: {
        userId,
        password: hashPassword,
        userName: userInfo.userName,
        fullName: userInfo.fullName,
      },
    });

    const profile = new Profile(userId, userInfo.fullName, userInfo.userName);

    const payload = { profile };

    const encodedJWT = this.jwtService.sign(payload);

    const load = {
      profile,
      auth_token: encodedJWT,
    };

    return load;
  }
}
