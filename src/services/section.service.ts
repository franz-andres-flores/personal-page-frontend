import { CreateSectionDto, ResponseSearchSectionDto, SearchSectionDto, UpdateSectionDto } from "@/dto";
import { Section } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class SectionService {
    async create(createSectionDto: CreateSectionDto): Promise<Section> {
        const result = await http.post('/section/create', createSectionDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.section;
    }

    async search(searchDto: SearchSectionDto): Promise<ResponseSearchSectionDto> {
        const result = await http.get('/section/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<Section[]> {
        const result = await http.get('/section/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.sections;
    }

    async update(id: number, updateSectionDto: UpdateSectionDto): Promise<Section> {
        const result = await http.patch(`/section/update/${id}`, updateSectionDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.section;
    }
}

export default new SectionService;