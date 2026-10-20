import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
    listarUsuarios() {
        return [
            {
                id: 1,
                nome: "Usuario teste",
                email: 'Teste@teste.com'
            },
        ];
    }
}
