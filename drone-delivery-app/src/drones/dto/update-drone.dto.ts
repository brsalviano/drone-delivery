import {
  Allow,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { DroneStatus } from '../drone-status.enum';

export class UpdateDroneDto {
  @IsUrl()
  @IsOptional()
  image?: string;

  @IsOptional()
  @Allow()
  name?: string;

  @IsOptional()
  @Allow()
  address?: string;

  @Min(0)
  @Max(100)
  @IsOptional()
  battery?: number;

  @Min(0)
  @Max(99)
  @IsOptional()
  @Allow()
  maxSpeed?: number;

  @Min(0)
  @Max(99)
  @IsOptional()
  @Allow()
  averageSpeed?: number;

  @IsEnum(DroneStatus)
  @IsOptional()
  status?: string;
}
