import { Category } from "./category.entity";
import { Publication } from "./publication.entity";

export interface Section {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    category: Category;
    publications: Publication[];
}