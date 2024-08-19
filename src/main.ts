import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.enableCors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  app.enableShutdownHooks();

  const appConfig = app.get(ConfigService); // ConfigService를 사용하기 위해 appConfig를 만들어줌

  const config = new DocumentBuilder()
    .setTitle("stop-be-clone")
    .setDescription("API Description")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "access-token"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(appConfig.get("app.port"));
  console.log(`==== Running as ${process.env.APP_ENV} ====`);
}
bootstrap();
