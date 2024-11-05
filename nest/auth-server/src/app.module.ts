import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { DbService } from './db/db.service';
import configuration from './config'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule { }
