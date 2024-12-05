import { Global, Logger, Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    RestaurantsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make it available everywhere
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}` // Use the appropriate .env file based on NODE_ENV
        : '.env', // Default to .env if NODE_ENV is not set
    }),
    // rabbitMQ Module
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'COMMANDS',
            type: 'direct',
          },
          {
            name: 'QUERIES',
            type: 'direct',
          },
        ],
        uri:
          'amqp://' +
          `${configService.get('RABBITMQ_USERNAME', 'guest')}:` +
          `${configService.get('RABBITMQ_PASSWORD', 'guest')}@` +
          `${configService.get('RABBITMQ_HOSTNAME', 'localhost')}:` +
          `${configService.get('RABBITMQ_PORT', '5672')}`,
        // channels: {
        //   Restaurants: {
        //     prefetchCount: 15,
        //     default: true,
        //   },
        // },
        connectionInitOptions: { wait: false },
      }),
    }),
    // Mongoose Module
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_CONNECTION_STRING') ||
          'mongodb://' +
            `${encodeURIComponent(configService.get<string>('MONGODB_USERNAME', 'admin'))}:` +
            `${encodeURIComponent(configService.get<string>('MONGODB_PASSWORD', '1234'))}@` +
            `${configService.get<string>('MONGODB_HOSTNAME', 'localhost')}:` +
            `${configService.get<number>('MONGODB_PORT', 27017)}/?replicaSet=` +
            `${configService.get<string>('MONGODB_REPLICASET', 'rs0')}` +
            `&readPreference=${configService.get<string>('MONGODB_READ_PREFERENCE', 'primary')}`,
        dbName: configService.get<string>('MONGODB_DATABASE', 'db-restaurants'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Logger],
  exports: [RabbitMQModule, Logger],
})
export class AppModule {}
