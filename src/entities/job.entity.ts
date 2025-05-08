export interface JobTechnology {
    name: string;
}

export interface Job {
    id: number;
    company: string;
    position: string;
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    description: string;
    technologies: JobTechnology;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}
