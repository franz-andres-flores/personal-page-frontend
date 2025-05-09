import { CreateUserDto, ResponseSearchUserDto, SearchDto, UpdateUserDto } from "@/dto";
import { User } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class UserService {
    async create(createUserDto: CreateUserDto): Promise<User> {
        const result = await http.post('/user/create', createUserDto, { 
            headers: authHeader(), 
            withCredentials: true 
        });
        
        return result.data.user;
    }

    async search(searchDto: SearchDto): Promise<ResponseSearchUserDto> {
        const result = await http.get('/user/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<User[]> {
        const result = await http.get('/user/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.users;
    }

    async findOne(id: number): Promise<User[]> {
        const result = await http.get(`/user/${id}`, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const result = await http.patch(`/user/update/${id}`, updateUserDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.user;
    }
}

export default new UserService;