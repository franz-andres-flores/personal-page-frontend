import { UserRole } from "@/helpers/enum";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}