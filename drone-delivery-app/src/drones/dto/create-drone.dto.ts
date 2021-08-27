import { IsEnum, IsNotEmpty, IsUrl, Max, Min } from 'class-validator';
import { DroneStatus } from '../drone-status.enum';

export class CreateDroneDto {
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @Min(0)
  @Max(100)
  @IsNotEmpty()
  battery: number;

  @IsNotEmpty()
  maxSpeed: number;

  @IsNotEmpty()
  averageSpeed: number;

  @IsEnum(DroneStatus)
  @IsNotEmpty()
  status: string;
}
