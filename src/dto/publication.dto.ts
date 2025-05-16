import { Section } from "jspdf-autotable";
import { SearchDto, SearchResponseDto } from "./generic.dto";
import { Publication } from "@/entities/publication.entity";

export interface CreatePublicationDto {
    name: string;
    date: string;
    description: string;
    section: Section;
}

export interface UpdatePublicationDto extends CreatePublicationDto {
    isActive?: boolean;
}

export interface SearchPublicationDto extends SearchDto {
    section_id: number;
}

export interface ResponseSearchPublicationDto extends SearchResponseDto {
    publications: Publication[];
}

export interface RowPublicationDto extends Publication {
    active: string;
}
