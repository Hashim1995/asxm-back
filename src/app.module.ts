import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutModule } from './about/about.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the configuration module available globally.
      envFilePath: '.env', // Make sure to provide the correct path to your .env file.
    }),
    AboutModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Read DATABASE_URL from environment variables.
        autoLoadEntities: true, // Automatically load entities from the application directory.
        synchronize: true, // Automatically synchronize the database schema with the entities (disable this in production).
        ssl: {
          rejectUnauthorized: false, // Allow SSL connections for PostgreSQL cloud providers.
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
