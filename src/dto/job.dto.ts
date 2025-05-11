import { Job, JobTechnology } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateJobDto {
    company: string;
    position: string;
    start_month: number;
    start_year: number;
    end_month: number;
    end_year: number;
    description: string;
    technologies: JobTechnology;
}

export interface UpdateJobDto extends CreateJobDto {
    isActive: boolean;
}

export interface ResponseSearchJobDto extends SearchResponseDto {
    jobs: Job[];
}

export interface RowJobDto extends Job {
    active: string;
}
