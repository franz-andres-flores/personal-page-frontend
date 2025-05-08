import { Block } from "./block.entity";
import { Section } from "./section.entity";

export interface Publication {
    id: number;
    name: string;
    date: Date | string;
    description: string;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    section: Section;
    blocks: Block[];
}