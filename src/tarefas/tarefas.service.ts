import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Tarefas } from "./entities/tarefas.entity";

@Injectable()
export class TarefasService {
    constructor(
        @InjectRepository(Tarefas)
        private readonly tarefaRepository: Repository<Tarefas>,
    ) {}

    listarTarefas() {
        return this.tarefaRepository.find();
    }

    criarTarefa(titulo: string) {
        const tarefa = this.tarefaRepository.create({
            titulo,
            concluida: false,
        });

        return this.tarefaRepository.save(tarefa);
    }
}
