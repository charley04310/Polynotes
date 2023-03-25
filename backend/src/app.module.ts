import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGODB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Inject the ConfigService.
    }),

    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILER_HOST'), // 587
          port: configService.get<number>('MAILER_PORT'), // smtp.etu.umontpellier.fr
          secure: false,
          auth: {
            user: configService.get<string>('MAILER_USER'), // charley.geoffroy@etu.umontpellier.fr
            pass: configService.get<string>('MAILER_PASSWORD'), // 123456789
          },
        },
        defaults: {
          from: '"Polynote inscription" <noreply@polynote.net>',
        },
      }),
      inject: [ConfigService], // Inject the ConfigService.
    }),

    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
