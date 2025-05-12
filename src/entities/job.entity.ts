export interface JobTechnology {
    name: string;
}

export interface Job {
    id: number;
    company: string;
    position: string;
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    isCurrentJob: boolean;    
    description: string;
    technologies: JobTechnology;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}
