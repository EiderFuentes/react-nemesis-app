import { IsOptional, IsString } from 'class-validator';

export class CombustibleCocinaDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    electricidad?: string;

    @IsOptional()
    @IsString()
    gasPropano?: string;

    @IsOptional()
    @IsString()
    gasNatural?: string;

    @IsOptional()
    @IsString()
    lena?: string;

    @IsOptional()
    @IsString()
    otro?: string;

    @IsOptional()
    @IsString()
    petroleo?: string;

    @IsOptional()
    @IsString()
    carbonMineral?: string;

    @IsOptional()
    @IsString()
    materiales?: string;

    @IsOptional()
    caracterizacion?: number;
}
