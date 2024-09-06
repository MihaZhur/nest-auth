import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ConfigModule.forRoot({isGlobal: true}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
