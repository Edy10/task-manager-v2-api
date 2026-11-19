import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tarefas')
export class Tarefas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 150})
    titulo: string;

    @Column({default: false})
    concluida: boolean;
}