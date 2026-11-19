import { Body, Controller, Get, Post } from '@nestjs/common';

import { TarefasService } from "./tarefas.service";

@Controller('tarefas')
export class TarefasController {
    constructor(
        private readonly tarefasService: TarefasService,
    ) {}

    @Get()
    ListarTarefas() {
        return this.tarefasService.listarTarefas();
    }

    @Post()
    CriarTarefa(
        @Body() body: { titulo: string },
    ) {
        return this.tarefasService.criarTarefa(body.titulo);
    }
}
