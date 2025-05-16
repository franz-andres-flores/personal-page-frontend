import { Category, Section } from "@/entities";
import { SearchDto, SearchResponseDto } from "./generic.dto";


export interface CreateSectionDto {
    name: string;
    description: string;
    category: Category;
}

export interface UpdateSectionDto extends CreateSectionDto {
    isActive: boolean;
}

export interface SearchSectionDto extends SearchDto {
    category_id: number;
}

export interface ResponseSearchSectionDto extends SearchResponseDto {
    sections: Section[];
}

export interface RowSectionDto extends Section {
    active: string;
}
