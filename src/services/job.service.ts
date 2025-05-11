import { CreateJobDto, ResponseSearchJobDto, SearchDto, UpdateJobDto } from "@/dto";
import { Job } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class JobService {
    async create(createJobDto: CreateJobDto): Promise<Job> {
        const result = await http.post('/job/create', createJobDto, { 
            headers: authHeader(), 
            withCredentials: true 
        });
        
        return result.data.job;
    }

    async search(searchDto: SearchDto): Promise<ResponseSearchJobDto> {
        const result = await http.get('/job/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<Job[]> {
        const result = await http.get('/job/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.jobs;
    }

    async findOne(id: number): Promise<Job[]> {
        const result = await http.get(`/job/${id}`, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.job;
    }

    async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
        const result = await http.patch(`/job/update/${id}`, updateJobDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.job;
    }
}

export default new JobService;