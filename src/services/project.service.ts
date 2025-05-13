import { CreateProjectDto, ResponseSearchProjectDto, SearchDto, UpdateProjectDto } from "@/dto";
import { Project } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class ProjectService {
    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const result = await http.post('/project/create', createProjectDto, {
            headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        });

        return result.data.project;
    }

    async search(searchDto: SearchDto): Promise<ResponseSearchProjectDto> {
        const result = await http.get('/project/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<Project[]> {
        const result = await http.get('/project/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.projects;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const result = await http.patch(`/project/update/${id}`, updateProjectDto, {
            headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        });

        return result.data.project;
    }
}

export default new ProjectService;