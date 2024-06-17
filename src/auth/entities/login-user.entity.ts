import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "../dto";

class LoginUserEntity {
  @ApiProperty({
    required: true,
    example: "userId",
    description: "The userId of the User",
  })
  userId: string;

  @ApiProperty({
    required: false,
    example: "fullName",
    description: "The fullName of the User",
  })
  fullName: string;

  @ApiProperty({
    required: true,
    example: "username",
    description: "The username of the User",
  })
  username: string;
}

export class LoginEntity {
  @ApiProperty({ required: true, type: LoginUserEntity })
  user: LoginUserEntity;

  @ApiProperty({ required: true, type: Profile })
  profile: Profile;

  @ApiProperty({ required: true, description: "JWT auth token" })
  auth_token: string;
}
