import { Job, JobTechnology } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateJobDto {
    company: string;
    position: string;
    startMonth: number;
    startYear: number;
    isCurrentJob: boolean;
    description?: string;
    technologies?: JobTechnology[];
    endMonth?: number;
    endYear?: number;  
}

export interface UpdateJobDto extends CreateJobDto {
    isActive: boolean;
}

export interface ResponseSearchJobDto extends SearchResponseDto {
    jobs: Job[];
}

export interface RowJobDto extends Job {
    active: string;
    startTimeLabel: string;
}
