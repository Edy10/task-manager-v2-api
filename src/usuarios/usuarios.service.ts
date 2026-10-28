import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

import { Usuario } from './entities/usuario.entity'

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        private readonly jwtService: JwtService,
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

    async login(email: string, senha: string) {
        const usuario = await this.usuarioRepository.findOne({
            where: {email},
        });

        if (!usuario) {
            throw new UnauthorizedException('E-mail ou senha inválida.');
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha,
        );

        if (!senhaValida) {
            throw new UnauthorizedException('E-mail ou senha inválida.');
        }

        const token = await this.jwtService.signAsync({
            id: usuario.id,
            email: usuario.email,
        });

        return {token};
    }
}