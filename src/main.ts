/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './utils/swaggers/swagger-config';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RestaurantOrdersModule } from './restaurant-orders/restaurant-orders.module';
import { RabbitMqValidationExceptionFilter } from './utils/exception-filter.util';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // Format validation errors
        const customErrors = errors.map((err) => ({
          field: err.property,
          constraints: Object.values(err.constraints),
        }));
        // Throw a RpcException with a custom error response
        return new BadRequestException({
          status: 'error',
          message: 'Validation failed',
          errors: customErrors,
        });
      },
    }),
  );
  app.useGlobalFilters(new RabbitMqValidationExceptionFilter());
  app.use((req: any, res: any, next: any) => {
    const REQUEST_ID = 'X-Request-ID';
    const CORRELATION_ID = 'X-Correlation-ID';
    if (!req.header(REQUEST_ID)) {
      req.headers[REQUEST_ID] = uuid4();
    }
    if (!req.header(CORRELATION_ID)) {
      req.headers[CORRELATION_ID] = uuid4();
    }
    res.setHeader(
      REQUEST_ID,
      req.headers[REQUEST_ID] || req.header(REQUEST_ID),
    );
    res.setHeader(
      CORRELATION_ID,
      req.headers[CORRELATION_ID] || req.header(CORRELATION_ID),
    );
    next();
  });

  const swaggerService = configService.get<string>(
    'SWAGGER_SERVICE',
    'localhost:4001',
  );
  const swaggerGateway = configService.get<string>(
    'SWAGGER_GATEWAY',
    'localhost:4000',
  );
  swaggerConfig({
    app,
    name: 'restaurants',
    module: RestaurantsModule,
    server: {
      gateway: swaggerGateway,
      service: swaggerService,
    },
  });

  swaggerConfig({
    app,
    name: 'restaurant-orders',
    module: RestaurantOrdersModule,
    server: {
      gateway: swaggerGateway,
      service: swaggerService,
    },
  });
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`listening on port ${process.env.PORT}`);
}
bootstrap();
