export interface Course {
    id: number;
    institution: string;
    title: string;
    date: string;
    description: string;
    certificatePath: string;
    certicateName: string;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}
