import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("app-controller")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
