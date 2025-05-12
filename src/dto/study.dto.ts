import { Study } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateStudyDto {
    institution: string;
    degree: string;
    startYear: number;
    endYear?: number;
    isCurrentStudy: boolean;
    description: string;
}

export interface UpdateStudyDto extends CreateStudyDto {
    isActive: boolean;
}

export interface ResponseSearchStudyDto extends SearchResponseDto {
    studies: Study[];
}

export interface RowStudyDto extends Study {
    active: string;
}