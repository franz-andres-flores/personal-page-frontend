export interface Course {
    id: number;
    institution: string;
    title: string;
    date: string;
    description: string;
    certificate_path: string;
    certicate_name: string;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}
