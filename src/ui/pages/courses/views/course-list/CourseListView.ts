import { defineComponent, onMounted, provide, reactive, toRefs } from "vue";
import { useQuasar } from 'quasar';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

import CourseFormComponent from "@/ui/pages/courses/components/course-form/CourseFormComponent.vue";
import { OptionDto, RowCourseDto, SearchDto, UpdateCourseDto } from "@/dto";
import { errorNotify, successNotify, verifyFilters } from "@/helpers/utilities";
import { ExportField } from "@/ui/components/modals/export/interfaces/export-fields";
import courseService from "@/services/course.service";
import { formatRowCourseDto } from "@/helpers/formats";


export default defineComponent({
    name: 'CourseListView',
    components: {
        CourseFormComponent,
    },
    setup() {
        const courseForm = reactive({
            toggleFormModal: false,
            course: {} as RowCourseDto
        });

        const courseConfirmModal = reactive({
            toggleConfirmModal: false,
            message: '',
            courseRow: {} as RowCourseDto
        });

        const courseTable = reactive({
            rows: [] as RowCourseDto[],
            columns: [
                { name: 'id', label: 'Id', field: 'id', align: "right" },
                { name: 'institution', label: 'Institución', field: 'institution', align: "left" },
                { name: 'title', label: 'Nombre', field: 'title', align: "left" },
                { name: 'date', label: 'Fecha', field: 'date', align: "left" },
                { name: 'active', label: 'Estado', field: '', align: "center" },
                { name: 'actions', label: 'Acciones', field: '', align: "center" }
            ] as QTableProps['columns'],
            pagination: {
                sortBy: '',
                descending: false,
                page: 1,
                rowsPerPage: 10,
                rowsNumber: 10
            },
            loading: false
        });
        provide('dataTable', courseTable);

        const courseExport = reactive({
            toggleExportModal: false,
            fileName: "cursos",
            service: 'Cursos',
            option: 0,
            fields: [
                { label: 'Id', name: 'id' },
                { label: 'Institución', name: 'institution' },
                { label: 'Nombre', name: 'title' },
                { label: 'Fecha', name: 'date'},
                { label: 'Descripción', name: 'description'},
                { label: 'Estado', name: 'active' },
            ] as ExportField[],
            dataExport: [] as RowCourseDto[],
        });


        const columnsOrder = reactive({
            columnsOrder: [
                { name: 'id', label: 'Id', field: 'id' },
                { name: 'institution', label: 'Institución', field: 'institution' },
                { name: 'title', label: 'Nombre', field: 'title' },
            ] as QTableProps['columns'],
        });

        const courseSearcher: SearchDto = reactive({
            searcher: '',
            active: true,
            inactive: false,
            sort_by: 'id',
            descending: true,
            page: courseTable.pagination.page,
            pageSize: courseTable.pagination.rowsPerPage,
        });

        const $q = useQuasar();

        const onUpdateSearcher = (searcher: string) => {
            courseSearcher.searcher = searcher;

            if (searcher == '') {
                searchCourse();
            }
        }

        const onUpdateActive = (active: boolean) => {
            courseSearcher.active = active;

            searchCourse();
        }

        const onUpdateInactive = (inactive: boolean) => {
            courseSearcher.inactive = inactive;

            searchCourse();
        }

        const onUpdateSortBy = (sortBy: string) => {
            courseSearcher.sort_by = sortBy;

            searchCourse();
        }

        const onUpdateDescending = (descending: boolean) => {
            courseSearcher.descending = descending;

            searchCourse();
        }

        const onSearch = () => {
            searchCourse();
        }

        const onReset = () => {
            courseSearcher.searcher = '';
            courseSearcher.active = true;
            courseSearcher.inactive = false;

            searchCourse();
        }

        const showFormCourse = (course?: RowCourseDto) => {
            courseForm.course = course ?? {} as RowCourseDto;
            courseForm.toggleFormModal = true;
        }

        const closeFormCourse = () => {
            courseForm.toggleFormModal = false;
            searchCourse();
        }

        const showExportModal = () => {
            courseExport.toggleExportModal = true;
        }

        const closeExportModal = () => {
            courseExport.toggleExportModal = false;
        }

        const exportCourses = async (opt: OptionDto) => {
            try {
                if (opt.value == 1) {
                    courseExport.dataExport = courseTable.rows;
                    return;
                }

                const resultCourse = await courseService.findAllExport();
                courseExport.dataExport = formatRowCourseDto(resultCourse);
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo exportar los cursos"));
            }
        }

        const searchCourse = async () => {
            try {
                courseTable.loading = true;
                verifyFilters(courseSearcher);

                const result = await courseService.search(courseSearcher);
                courseTable.pagination.rowsNumber = result.total;
                courseTable.rows = formatRowCourseDto(result.courses);

                courseTable.loading = false;
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo buscar los cursos"));
                courseTable.loading = false;
            }
        }

        const onRequest = (props) => {
            courseSearcher.page = props.pagination.page;
            courseSearcher.pageSize = props.pagination.rowsPerPage;

            courseTable.pagination = props.pagination;
            searchCourse();
        }

        const showConfirmModal = (row: RowCourseDto) => {
            const message = '¿Estás seguro que deseas ' + ((row.isActive) ? 'dar de baja' : 'restaurar') +
                ' el curso seleccionado?';

            courseConfirmModal.toggleConfirmModal = true;
            courseConfirmModal.courseRow = row;
            courseConfirmModal.message = message;
        }

        const closeConfirmModal = () => {
            courseConfirmModal.toggleConfirmModal = false;
        }

        const updateActiveCourse = async (result: boolean) => {
            if (result) {
                const courseDto = {
                    isActive: !courseConfirmModal.courseRow.isActive
                } as UpdateCourseDto;

                await courseService.update(courseConfirmModal.courseRow.id, courseDto);
                $q.notify(successNotify('Se ha actualizado el estado del curso correctamente'));
            }

            searchCourse();
        }

        onMounted(() => {
            searchCourse();
        });

        return {
            ...toRefs(courseForm),
            ...toRefs(courseSearcher),
            ...toRefs(columnsOrder),
            ...toRefs(courseTable),
            ...toRefs(courseConfirmModal),
            ...toRefs(courseExport),
            onUpdateSearcher,
            onUpdateActive,
            onUpdateInactive,
            onUpdateSortBy,
            onUpdateDescending,
            onSearch,
            onReset,
            showFormCourse,
            closeFormCourse,
            onRequest,
            showConfirmModal,
            closeConfirmModal,
            updateActiveCourse,
            showExportModal,
            closeExportModal,
            exportCourses
        }
    }
});