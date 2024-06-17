import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignupDto {
  @ApiProperty({ required: true })
  @IsString()
  userName: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  fullName: string;
}
