import { Project, ProjectImage, ProjectTechnology } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateProjectDto {
    name: string;
    description: string;
    technologies: ProjectTechnology[];
    urlRepository: string;
}

export interface UpdateProjectDto extends CreateProjectDto {
    isActive?: boolean;
    deleteImages?: ProjectImage[];
}

export interface ResponseSearchProjectDto extends SearchResponseDto {
    projects: Project[];
}

export interface RowProjectDto extends Project {
    active: string;
}
