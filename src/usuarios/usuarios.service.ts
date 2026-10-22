import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from './entities/usuario.entity'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    listarUsuarios() {
        return this.usuarioRepository.find();
    }

    async criarUsuario(nome: string, email: string, senha: string) {
        const usuarioExistente = await this.usuarioRepository.findOne({
            where: { email },
        });

        if (usuarioExistente) {
            throw new ConflictException('E-mail já cadastrado.');
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = this.usuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
        });

        try {
            const usuarioSalvo = await this.usuarioRepository.save(usuario);

            return {
                id: usuarioSalvo.id,
                nome: usuarioSalvo.nome,
                email: usuarioSalvo.email,
            };
        } catch (erro) {
            throw new InternalServerErrorException('Erro ao cadastrar usuário.');
        }
    }
}
