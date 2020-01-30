import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
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
  @Exclude()
  password: string;
}
