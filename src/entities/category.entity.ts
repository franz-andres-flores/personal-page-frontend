import { Section } from "./section.entity";

export interface Category {
    id: number;
    name: string;
    image: string;
    imagePublicId: string;
    description: string;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    sections: Section[];
}
