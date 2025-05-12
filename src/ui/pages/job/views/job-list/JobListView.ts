import { defineComponent, onMounted, provide, reactive, toRefs } from "vue";
import { useQuasar } from 'quasar';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

import JobFormComponent from "@/ui/pages/job/components/job-form/JobFormComponent.vue";
import { OptionDto, RowJobDto, SearchDto, UpdateJobDto } from "@/dto";
import { errorNotify, successNotify, verifyFilters } from "@/helpers/utilities";
import { ExportField } from "@/ui/components/modals/export/interfaces/export-fields";
import jobService from "@/services/job.service";
// import { formatRowJobDto } from "@/helpers/formats";


export default defineComponent({
    name: 'JobListView',
    components: {
        JobFormComponent,
    },
    setup() {
        const jobForm = reactive({
            toggleFormModal: false,
            job: {} as RowJobDto
        });

        const jobConfirmModal = reactive({
            toggleConfirmModal: false,
            message: '',
            jobRow: {} as RowJobDto
        });

        const jobTable = reactive({
            rows: [] as RowJobDto[],
            columns: [
                { name: 'id', label: 'Id', field: 'id', align: "right" },
                { name: 'company', label: 'Empresa', field: 'company', align: "left" },
                { name: 'position', label: 'Cargo', field: 'position', align: "left" },
                { name: 'startTimeLabel', label: 'Fecha de inicio', field: 'startTimeLabel', align: "left" },
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
        provide('dataTable', jobTable);

        const jobExport = reactive({
            toggleExportModal: false,
            fileName: "trabajo",
            service: 'Trabajo',
            option: 0,
            fields: [
                { label: 'Nombres', name: 'firstName' },
                { label: 'Apellidos', name: 'lastName' },
                { label: 'Rol', name: 'roleLabel' },
                { label: 'Estado', name: 'active' },
            ] as ExportField[],
            dataExport: [] as RowJobDto[],
        });


        const columnsOrder = reactive({
            columnsOrder: [
                { name: 'id', label: 'Id', field: 'id' },
                { name: 'firstName', label: 'Nombre', field: 'firstName' },
                { name: 'lastName', label: 'Apellido', field: 'lastName' },
            ] as QTableProps['columns'],
        });

        const jobSearcher: SearchDto = reactive({
            searcher: '',
            active: true,
            inactive: false,
            sort_by: 'id',
            descending: true,
            page: jobTable.pagination.page,
            pageSize: jobTable.pagination.rowsPerPage,
        });

        const $q = useQuasar();

        const onUpdateSearcher = (searcher: string) => {
            jobSearcher.searcher = searcher;

            if (searcher == '') {
                searchJob();
            }
        }

        const onUpdateActive = (active: boolean) => {
            jobSearcher.active = active;

            searchJob();
        }

        const onUpdateInactive = (inactive: boolean) => {
            jobSearcher.inactive = inactive;

            searchJob();
        }

        const onUpdateSortBy = (sortBy: string) => {
            jobSearcher.sort_by = sortBy;

            searchJob();
        }

        const onUpdateDescending = (descending: boolean) => {
            jobSearcher.descending = descending;

            searchJob();
        }

        const onSearch = () => {
            searchJob();
        }

        const onReset = () => {
            jobSearcher.searcher = '';
            jobSearcher.active = true;
            jobSearcher.inactive = false;

            searchJob();
        }

        const showFormJob = (job?: RowJobDto) => {
            jobForm.job = job ?? {} as RowJobDto;
            jobForm.toggleFormModal = true;
        }

        const closeFormJob = () => {
            jobForm.toggleFormModal = false;
            searchJob();
        }

        const showExportModal = () => {
            jobExport.toggleExportModal = true;
        }

        const closeExportModal = () => {
            jobExport.toggleExportModal = false;
        }

        const exportJobs = async (opt: OptionDto) => {
            try {
                if (opt.value == 1) {
                    jobExport.dataExport = jobTable.rows;
                    return;
                }

                const resultJob = await jobService.findAllExport();
                // jobExport.dataExport = formatRowJobDto(resultJob);
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo exportar los empleos"));
            }
        }

        const searchJob = async () => {
            try {
                jobTable.loading = true;
                verifyFilters(jobSearcher);

                const result = await jobService.search(jobSearcher);
                jobTable.pagination.rowsNumber = result.total;
                // jobTable.rows = formatRowJobDto(result.jobs);

                jobTable.loading = false;
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo buscar los empleos"));
                jobTable.loading = false;
            }
        }

        const onRequest = (props) => {
            jobSearcher.page = props.pagination.page;
            jobSearcher.pageSize = props.pagination.rowsPerPage;

            jobTable.pagination = props.pagination;
            searchJob();
        }

        const showConfirmModal = (row: RowJobDto) => {
            const message = '¿Estás seguro que deseas ' + ((row.isActive) ? 'dar de baja' : 'restaurar') +
                ' el empleo seleccionado?';

            jobConfirmModal.toggleConfirmModal = true;
            jobConfirmModal.jobRow = row;
            jobConfirmModal.message = message;
        }

        const closeConfirmModal = () => {
            jobConfirmModal.toggleConfirmModal = false;
        }

        const updateActiveJob = async (result: boolean) => {
            if (result) {
                const jobDto = {
                    isActive: !jobConfirmModal.jobRow.isActive
                } as UpdateJobDto;

                await jobService.update(jobConfirmModal.jobRow.id, jobDto);
                $q.notify(successNotify('Se ha actualizado el estado del empleo correctamente'));
            }

            searchJob();
        }

        onMounted(() => {
            searchJob();
        });

        return {
            ...toRefs(jobForm),
            ...toRefs(jobSearcher),
            ...toRefs(columnsOrder),
            ...toRefs(jobTable),
            ...toRefs(jobConfirmModal),
            ...toRefs(jobExport),
            onUpdateSearcher,
            onUpdateActive,
            onUpdateInactive,
            onUpdateSortBy,
            onUpdateDescending,
            onSearch,
            onReset,
            showFormJob,
            closeFormJob,
            onRequest,
            showConfirmModal,
            closeConfirmModal,
            updateActiveJob,
            showExportModal,
            closeExportModal,
            exportJobs
        }
    }
});