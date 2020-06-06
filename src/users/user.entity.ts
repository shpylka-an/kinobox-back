import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './roles/role.entity';

@Entity('users')
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index()
  @Column()
  username: string;

  @Column({ nullable: true })
  avatar?: string;

  @Index()
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(
    type => Role,
    role => role.users,
  )
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles?: Role[];
}
