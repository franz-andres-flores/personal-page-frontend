import { defineComponent, onMounted, provide, reactive, toRefs } from "vue";
import { useQuasar } from 'quasar';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

import ProjectFormComponent from "@/ui/pages/projects/components/project-form/ProjectFormComponent.vue";
import { OptionDto, RowProjectDto, SearchDto, UpdateProjectDto } from "@/dto";
import { errorNotify, successNotify, verifyFilters } from "@/helpers/utilities";
import { ExportField } from "@/ui/components/modals/export/interfaces/export-fields";
import projectService from "@/services/project.service";
import { formatRowProjectDto } from "@/helpers/formats";

export default defineComponent({
    name: 'ProjectListView',
    components: {
        ProjectFormComponent,
    },
    setup() {
        const projectForm = reactive({
            toggleFormModal: false,
            project: {} as RowProjectDto
        });

        const projectConfirmModal = reactive({
            toggleConfirmModal: false,
            message: '',
            projectRow: {} as RowProjectDto
        });

        const projectTable = reactive({
            rows: [] as RowProjectDto[],
            columns: [
                { name: 'id', label: 'Id', field: 'id', align: "right" },
                { name: 'name', label: 'Nombre', field: 'name', align: "left" },
                { name: 'description', label: 'Descripción', field: 'description', align: "left" },
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
        provide('dataTable', projectTable);

        const projectExport = reactive({
            toggleExportModal: false,
            fileName: "proyecto",
            service: 'Proyecto',
            option: 0,
            fields: [
                { label: 'Id', name: 'id' },
                { label: 'Nombre', name: 'name' },
                { label: 'Descripción', name: 'description' },
                { label: 'Tecnologías', name: 'technologies' },
                { label: 'Url Repositorio', name: 'urlRepository' },
                { label: 'Imágenes', name: 'images' },
                { label: 'Estado', name: 'active' },
            ] as ExportField[],
            dataExport: [] as RowProjectDto[],
        });

        const columnsOrder = reactive({
            columnsOrder: [
                { name: 'id', label: 'Id', field: 'id' },
                { name: 'name', label: 'Nombre', field: 'name' }
            ] as QTableProps['columns'],
        });

        const projectSearcher: SearchDto = reactive({
            searcher: '',
            active: true,
            inactive: false,
            sort_by: 'id',
            descending: true,
            page: projectTable.pagination.page,
            pageSize: projectTable.pagination.rowsPerPage,
        });

        const $q = useQuasar();

        const onUpdateSearcher = (searcher: string) => {
            projectSearcher.searcher = searcher;

            if (searcher == '') {
                searchProject();
            }
        }

        const onUpdateActive = (active: boolean) => {
            projectSearcher.active = active;

            searchProject();
        }

        const onUpdateInactive = (inactive: boolean) => {
            projectSearcher.inactive = inactive;

            searchProject();
        }

        const onUpdateSortBy = (sortBy: string) => {
            projectSearcher.sort_by = sortBy;

            searchProject();
        }

        const onUpdateDescending = (descending: boolean) => {
            projectSearcher.descending = descending;

            searchProject();
        }

        const onSearch = () => {
            searchProject();
        }

        const onReset = () => {
            projectSearcher.searcher = '';
            projectSearcher.active = true;
            projectSearcher.inactive = false;

            searchProject();
        }

        const showFormProject = (project?: RowProjectDto) => {
            projectForm.project = project ?? {} as RowProjectDto;
            projectForm.toggleFormModal = true;
        }

        const closeFormProject = () => {
            projectForm.toggleFormModal = false;
            searchProject();
        }

        const showExportModal = () => {
            projectExport.toggleExportModal = true;
        }

        const closeExportModal = () => {
            projectExport.toggleExportModal = false;
        }

        const exportProjects = async (opt: OptionDto) => {
            try {
                if (opt.value == 1) {
                    projectExport.dataExport = projectTable.rows;
                    return;
                }

                const resultProject = await projectService.findAllExport();
                projectExport.dataExport = formatRowProjectDto(resultProject);
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo exportar los proyectos"));
            }
        }

        const searchProject = async () => {
            try {
                projectTable.loading = true;
                verifyFilters(projectSearcher);

                const result = await projectService.search(projectSearcher);
                projectTable.pagination.rowsNumber = result.total;
                projectTable.rows = formatRowProjectDto(result.projects);

                projectTable.loading = false;
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo buscar los proyectos"));
                projectTable.loading = false;
            }
        }

        const onRequest = (props) => {
            projectSearcher.page = props.pagination.page;
            projectSearcher.pageSize = props.pagination.rowsPerPage;

            projectTable.pagination = props.pagination;
            searchProject();
        }

        const showConfirmModal = (row: RowProjectDto) => {
            const message = '¿Estás seguro que deseas ' + ((row.isActive) ? 'dar de baja' : 'restaurar') +
                ' el proyecto seleccionado?';

            projectConfirmModal.toggleConfirmModal = true;
            projectConfirmModal.projectRow = row;
            projectConfirmModal.message = message;
        }

        const closeConfirmModal = () => {
            projectConfirmModal.toggleConfirmModal = false;
        }

        const updateActiveProject = async (result: boolean) => {
            if (result) {
                const projectDto = {
                    isActive: !projectConfirmModal.projectRow.isActive
                } as UpdateProjectDto;

                await projectService.update(projectConfirmModal.projectRow.id, projectDto);
                $q.notify(successNotify('Se ha actualizado el estado del proyecto correctamente'));
            }

            searchProject();
        }

        onMounted(() => {
            searchProject();
        });

        return {
            ...toRefs(projectForm),
            ...toRefs(projectSearcher),
            ...toRefs(columnsOrder),
            ...toRefs(projectTable),
            ...toRefs(projectConfirmModal),
            ...toRefs(projectExport),
            onUpdateSearcher,
            onUpdateActive,
            onUpdateInactive,
            onUpdateSortBy,
            onUpdateDescending,
            onSearch,
            onReset,
            showFormProject,
            closeFormProject,
            onRequest,
            showConfirmModal,
            closeConfirmModal,
            updateActiveProject,
            showExportModal,
            closeExportModal,
            exportProjects
        }
    }
});