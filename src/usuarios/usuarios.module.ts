import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { Usuario } from "./entities/usuario.entity";
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([Usuario]),

      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                  expiresIn: '1h',
              },
          }),
      }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
