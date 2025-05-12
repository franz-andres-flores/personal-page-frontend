import { CreateStudyDto, ResponseSearchStudyDto, SearchDto, UpdateStudyDto } from "@/dto";
import { Study } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class StudyService {
    async create(createStudyDto: CreateStudyDto): Promise<Study> {
        const result = await http.post('/study/create', createStudyDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.study;
    }

    async search(searchDto: SearchDto): Promise<ResponseSearchStudyDto> {
        const result = await http.get('/study/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<Study[]> {
        const result = await http.get('/study/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.studys;
    }

    async findOne(id: number): Promise<Study[]> {
        const result = await http.get(`/study/${id}`, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.study;
    }

    async update(id: number, updateStudyDto: UpdateStudyDto): Promise<Study> {
        const result = await http.patch(`/study/update/${id}`, updateStudyDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.study;
    }
}

export default new StudyService;