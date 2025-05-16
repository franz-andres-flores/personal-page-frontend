import { CreateCategoryDto, ResponseSearchCategoryDto, SearchDto, UpdateCategoryDto } from "@/dto";
import { Category } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class CategoryService {
    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const result = await http.post('/category/create', createCategoryDto, {
            headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        });

        return result.data.category;
    }

    async search(searchDto: SearchDto): Promise<ResponseSearchCategoryDto> {
        const result = await http.get('/category/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<Category[]> {
        const result = await http.get('/category/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.categorys;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const result = await http.patch(`/category/update/${id}`, updateCategoryDto, {
            headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        });

        return result.data.category;
    }
}

export default new CategoryService;