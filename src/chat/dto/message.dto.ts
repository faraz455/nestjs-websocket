import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class MessageDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  message: string;
}
