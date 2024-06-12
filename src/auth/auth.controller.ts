import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { TenantConfig } from "../multi-tenant/multi-tenant.config";
import { TENANT_CONFIG } from "../multi-tenant/multi-tenant.module";
import { LoginDto, Profile } from "./dto";
import { AuthService } from "./auth.service";
import { GetUser, Public } from "./decorators";
import { LoginGuard } from "./guards/login.guard";

import { LoginEntity } from "./entities";
import { NewJwtGuard } from "./guards/new-jwt.guard";
import { SignupDto } from "./dto/signup.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(TENANT_CONFIG) private tConfig: TenantConfig
  ) {}

  @Public()
  @ApiOkResponse({ type: LoginEntity })
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @GetUser() user: any,
    @Res({ passthrough: true }) res: Response,
    @GetUser("profile") profile: Profile
  ) {
    const payload = await this.authService.login(user);

    res.cookie(this.tConfig.AUTH_COOKIE_NAME, payload.auth_token, {
      signed: true,
    });

    return payload;
  }

  @Public()
  @ApiOkResponse({ type: LoginEntity })
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    const payload = await this.authService.signup(signupDto);

    return payload;
  }
}
