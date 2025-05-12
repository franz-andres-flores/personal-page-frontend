import { Course } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateCourseDto {
    institution: string;
    title: string;
    date: string;
    description: string;
}

export interface UpdateCourseDto extends CreateCourseDto {
    isActive: boolean;
}

export interface ResponseSearchCourseDto extends SearchResponseDto {
    courses: Course[];
}

export interface RowCourseDto extends Course {
    active: string;
}