import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column()
  username: string;

  @Column({nullable: true})
  firstName?: string;

  @Column({nullable: true})
  lastName?: string;

  @Column({nullable: true})
  avatar?: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;
}
