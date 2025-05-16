import { Category } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateCategoryDto {
    name: string;
    description?: string;
}

export interface UpdateCategoryDto extends CreateCategoryDto {
    isActive?: boolean;
}

export interface ResponseSearchCategoryDto extends SearchResponseDto {
    categories: Category[];
}

export interface RowCategoryDto extends Category {
    active: string;
}
