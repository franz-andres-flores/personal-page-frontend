import { User } from "@/entities";
import { SearchResponseDto } from "./generic.dto";

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UpdateUserDto extends CreateUserDto {
    isActive: boolean;
}

export interface ResponseSearchUserDto extends SearchResponseDto {
    users: User[];
}

export interface RowUserDto extends User {
    roleLabel: string;
    active: string;
}


