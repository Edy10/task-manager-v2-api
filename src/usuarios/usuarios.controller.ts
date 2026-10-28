import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "../auth.guard";
import { UsuariosService } from "./usuarios.service";
import {get} from "http";

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    listarUsuarios() {
        return this.usuariosService.listarUsuarios();
    }

    @Post()
    criarUsuario(
        @Body() body: { nome: string; email: string; senha: string },
    ) {
        return this.usuariosService.criarUsuario(
            body.nome,
            body.email,
            body.senha,
        );
    }

    @Post('login')
    login(
        @Body() body: {email: string, senha: string},
    ) {
        return this.usuariosService.login(
            body.email,
            body.senha
        );
    }

    @Get('perfil')
    @UseGuards(AuthGuard)
    perfil() {
        return {
            mensagem: 'Rota protegida acessada com sucesso.',
        };
    }

}
