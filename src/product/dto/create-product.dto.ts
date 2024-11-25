import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;  

  @IsString()
  @IsNotEmpty()
  description!: string;  

  @IsInt()
  @IsPositive()
  price!: number; 
  @IsInt()
  @IsPositive()
  quantity!: number;  
}
