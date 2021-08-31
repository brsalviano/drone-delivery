import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'drones' })
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  battery: number;

  @Column({ name: 'max_speed' })
  maxSpeed: number;

  @Column({ name: 'average_speed' })
  averageSpeed: number;

  @Column()
  status: string;
}
