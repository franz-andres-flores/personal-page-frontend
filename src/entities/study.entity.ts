export interface Study {
    id: number;
    institution: string;
    degree: string;
    startYear: number;
    isCurrentStudy: boolean;
    endYear: number;
    description: string;
    certificate_path: string;
    certicate_name: string;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}