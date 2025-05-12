import { CreateCourseDto, ResponseSearchCourseDto, SearchDto, UpdateCourseDto } from "@/dto";
import { Course } from "@/entities";
import http from "@/helpers/http";
import { authHeader } from "@/helpers/utilities";

class CourseService {
    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const result = await http.post('/course/create', createCourseDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.course;
    }

    async search(searchDto: SearchDto): Promise<ResponseSearchCourseDto> {
        const result = await http.get('/course/search', {
            params: searchDto,
            headers: authHeader(),
            withCredentials: true
        });

        return result.data;
    }

    async findAllExport(): Promise<Course[]> {
        const result = await http.get('/course/all-export', {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.courses;
    }

    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const result = await http.patch(`/course/update/${id}`, updateCourseDto, {
            headers: authHeader(),
            withCredentials: true
        });

        return result.data.course;
    }
}

export default new CourseService;