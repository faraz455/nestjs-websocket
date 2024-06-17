import { ApiProperty } from "@nestjs/swagger";

export class Profile {
  @ApiProperty({})
  userId: string;

  @ApiProperty({})
  fullName: string;

  @ApiProperty({})
  userName: string;

  constructor(userId: string, fullName: string, userName: string) {
    this.userId = userId;
    this.fullName = fullName;
    this.userName = userName;
  }
}
