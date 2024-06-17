import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as bodyParser from "body-parser";
import { IoAdapter } from "@nestjs/platform-socket.io";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./prisma/prisma-client-exception.filter";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ["localhost:9092"],
      },
      consumer: {
        groupId: "nestjs-consumer-group",
        allowAutoTopicCreation: true,
        retry: {
          retries: 8,
        },
        sessionTimeout: 30000,
        heartbeatInterval: 3000,
      },
    },
  });

  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.use(cookieParser(process.env.AUTH_COOKIE_SECRET));
  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  app.useWebSocketAdapter(new IoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle("NEST - JS")
    .setDescription("The NEST JS API description")
    .setVersion("0.1")
    .addBearerAuth()
    .build();

  if (process.env?.PRODUCTION === "0") {
    app.enableCors();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document, {
      swaggerOptions: { displayRequestDuration: true },
    });
  }
  await app.listen(3000);
}
bootstrap();
