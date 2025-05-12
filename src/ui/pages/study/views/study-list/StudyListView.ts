import { defineComponent, onMounted, provide, reactive, toRefs } from "vue";
import { useQuasar } from 'quasar';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

import StudyFormComponent from "@/ui/pages/study/components/study-form/StudyFormComponent.vue";
import { OptionDto, RowStudyDto, SearchDto, UpdateStudyDto } from "@/dto";
import { errorNotify, successNotify, verifyFilters } from "@/helpers/utilities";
import { ExportField } from "@/ui/components/modals/export/interfaces/export-fields";
import studyService from "@/services/study.service";
import { formatRowStudyDto } from "@/helpers/formats";


export default defineComponent({
    name: 'StudyListView',
    components: {
        StudyFormComponent,
    },
    setup() {
        const studyForm = reactive({
            toggleFormModal: false,
            study: {} as RowStudyDto
        });

        const studyConfirmModal = reactive({
            toggleConfirmModal: false,
            message: '',
            studyRow: {} as RowStudyDto
        });

        const studyTable = reactive({
            rows: [] as RowStudyDto[],
            columns: [
                { name: 'id', label: 'Id', field: 'id', align: "right" },
                { name: 'institution', label: 'Institución', field: 'institution', align: "left" },
                { name: 'degree', label: 'Titulación', field: 'degree', align: "left" },
                { name: 'startYear', label: 'Año Inicio', field: 'startYear', align: "left" },
                { name: 'endYear', label: 'Año Finalización', field: 'startYear', align: "left" },
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
        provide('dataTable', studyTable);

        const studyExport = reactive({
            toggleExportModal: false,
            fileName: "estudios",
            service: 'Estudios',
            option: 0,
            fields: [
                { label: 'Id', name: 'id' },
                { label: 'Institución', name: 'institution' },
                { label: 'Titulación', name: 'degree' },
                { label: 'Año Inicio', name: 'startYear'},
                { label: 'Año Finalización', name: 'endYear'},
                { label: 'Estado', name: 'active' },
            ] as ExportField[],
            dataExport: [] as RowStudyDto[],
        });


        const columnsOrder = reactive({
            columnsOrder: [
                { name: 'id', label: 'Id', field: 'id' },
                { name: 'institution', label: 'Institución', field: 'institution' },
                { name: 'degree', label: 'Titulación', field: 'degree' },
            ] as QTableProps['columns'],
        });

        const studySearcher: SearchDto = reactive({
            searcher: '',
            active: true,
            inactive: false,
            sort_by: 'id',
            descending: true,
            page: studyTable.pagination.page,
            pageSize: studyTable.pagination.rowsPerPage,
        });

        const $q = useQuasar();

        const onUpdateSearcher = (searcher: string) => {
            studySearcher.searcher = searcher;

            if (searcher == '') {
                searchStudy();
            }
        }

        const onUpdateActive = (active: boolean) => {
            studySearcher.active = active;

            searchStudy();
        }

        const onUpdateInactive = (inactive: boolean) => {
            studySearcher.inactive = inactive;

            searchStudy();
        }

        const onUpdateSortBy = (sortBy: string) => {
            studySearcher.sort_by = sortBy;

            searchStudy();
        }

        const onUpdateDescending = (descending: boolean) => {
            studySearcher.descending = descending;

            searchStudy();
        }

        const onSearch = () => {
            searchStudy();
        }

        const onReset = () => {
            studySearcher.searcher = '';
            studySearcher.active = true;
            studySearcher.inactive = false;

            searchStudy();
        }

        const showFormStudy = (study?: RowStudyDto) => {
            studyForm.study = study ?? {} as RowStudyDto;
            studyForm.toggleFormModal = true;
        }

        const closeFormStudy = () => {
            studyForm.toggleFormModal = false;
            searchStudy();
        }

        const showExportModal = () => {
            studyExport.toggleExportModal = true;
        }

        const closeExportModal = () => {
            studyExport.toggleExportModal = false;
        }

        const exportStudies = async (opt: OptionDto) => {
            try {
                if (opt.value == 1) {
                    studyExport.dataExport = studyTable.rows;
                    return;
                }

                const resultStudy = await studyService.findAllExport();
                studyExport.dataExport = formatRowStudyDto(resultStudy);
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo exportar los estudios"));
            }
        }

        const searchStudy = async () => {
            try {
                studyTable.loading = true;
                verifyFilters(studySearcher);

                const result = await studyService.search(studySearcher);
                studyTable.pagination.rowsNumber = result.total;
                studyTable.rows = formatRowStudyDto(result.studies);

                studyTable.loading = false;
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo buscar los estudios"));
                studyTable.loading = false;
            }
        }

        const onRequest = (props) => {
            studySearcher.page = props.pagination.page;
            studySearcher.pageSize = props.pagination.rowsPerPage;

            studyTable.pagination = props.pagination;
            searchStudy();
        }

        const showConfirmModal = (row: RowStudyDto) => {
            const message = '¿Estás seguro que deseas ' + ((row.isActive) ? 'dar de baja' : 'restaurar') +
                ' el estudio seleccionado?';

            studyConfirmModal.toggleConfirmModal = true;
            studyConfirmModal.studyRow = row;
            studyConfirmModal.message = message;
        }

        const closeConfirmModal = () => {
            studyConfirmModal.toggleConfirmModal = false;
        }

        const updateActiveStudy = async (result: boolean) => {
            if (result) {
                const studyDto = {
                    isActive: !studyConfirmModal.studyRow.isActive
                } as UpdateStudyDto;

                await studyService.update(studyConfirmModal.studyRow.id, studyDto);
                $q.notify(successNotify('Se ha actualizado el estado del estudio correctamente'));
            }

            searchStudy();
        }

        onMounted(() => {
            searchStudy();
        });

        return {
            ...toRefs(studyForm),
            ...toRefs(studySearcher),
            ...toRefs(columnsOrder),
            ...toRefs(studyTable),
            ...toRefs(studyConfirmModal),
            ...toRefs(studyExport),
            onUpdateSearcher,
            onUpdateActive,
            onUpdateInactive,
            onUpdateSortBy,
            onUpdateDescending,
            onSearch,
            onReset,
            showFormStudy,
            closeFormStudy,
            onRequest,
            showConfirmModal,
            closeConfirmModal,
            updateActiveStudy,
            showExportModal,
            closeExportModal,
            exportStudys: exportStudies
        }
    }
});