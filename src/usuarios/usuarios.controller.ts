import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from "./usuarios.service";

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
}
