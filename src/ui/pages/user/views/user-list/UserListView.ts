import { defineComponent, onMounted, provide, reactive, toRefs } from "vue";
import { useQuasar } from 'quasar';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

import UserFormComponent from "@/ui/pages/user/components/user-form/UserFormComponent.vue";
import { OptionDto, RowUserDto, SearchDto, UpdateUserDto } from "@/dto";
import { errorNotify, successNotify, verifyFilters } from "@/helpers/utilities";
import { ExportField } from "@/ui/components/modals/export/interfaces/export-fields";
import userService from "@/services/user.service";
import { formatRowUserDto } from "@/helpers/formats";


export default defineComponent({
    name: 'UserListView',
    components: {
        UserFormComponent,
    },
    setup() {
        const userForm = reactive({
            toggleFormModal: false,
            user: {} as RowUserDto
        });

        const userConfirmModal = reactive({
            toggleConfirmModal: false,
            message: '',
            userRow: {} as RowUserDto
        });

        const userTable = reactive({
            rows: [] as RowUserDto[],
            columns: [
                { name: 'id', label: 'Id', field: 'id', align: "right" },
                { name: 'firstName', label: 'Nombres', field: 'firstName', align: "left" },
                { name: 'lastName', label: 'Apellidos', field: 'lastName', align: "left" },
                { name: 'roleLabel', label: 'Rol', field: 'roleLabel', align: "left" },
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
        provide('dataTable', userTable);

        const userExport = reactive({
            toggleExportModal: false,
            fileName: "usuario",
            service: 'Usuario',
            option: 0,
            fields: [
                { label: 'Nombres', name: 'firstName' },
                { label: 'Apellidos', name: 'lastName' },
                { label: 'Rol', name: 'roleLabel' },
                { label: 'Estado', name: 'active' },
            ] as ExportField[],
            dataExport: [] as RowUserDto[],
        });


        const columnsOrder = reactive({
            columnsOrder: [
                { name: 'id', label: 'Id', field: 'id' },
                { name: 'firstName', label: 'Nombre', field: 'firstName' },
                { name: 'lastName', label: 'Apellido', field: 'lastName' },
            ] as QTableProps['columns'],
        });

        const userSearcher: SearchDto = reactive({
            searcher: '',
            active: true,
            inactive: false,
            sort_by: 'id',
            descending: true,
            page: userTable.pagination.page,
            pageSize: userTable.pagination.rowsPerPage,
        });

        const $q = useQuasar();

        const onUpdateSearcher = (searcher: string) => {
            userSearcher.searcher = searcher;

            if (searcher == '') {
                searchUser();
            }
        }

        const onUpdateActive = (active: boolean) => {
            userSearcher.active = active;

            searchUser();
        }

        const onUpdateInactive = (inactive: boolean) => {
            userSearcher.inactive = inactive;

            searchUser();
        }

        const onUpdateSortBy = (sortBy: string) => {
            userSearcher.sort_by = sortBy;

            searchUser();
        }

        const onUpdateDescending = (descending: boolean) => {
            userSearcher.descending = descending;

            searchUser();
        }

        const onSearch = () => {
            searchUser();
        }

        const onReset = () => {
            userSearcher.searcher = '';
            userSearcher.active = true;
            userSearcher.inactive = false;

            searchUser();
        }

        const showFormUser = (user?: RowUserDto) => {
            userForm.user = user ?? {} as RowUserDto;
            userForm.toggleFormModal = true;
        }

        const closeFormUser = () => {
            userForm.toggleFormModal = false;
            searchUser();
        }

        const showExportModal = () => {
            userExport.toggleExportModal = true;
        }

        const closeExportModal = () => {
            userExport.toggleExportModal = false;
        }

        const exportUsers = async (opt: OptionDto) => {
            try {
                if (opt.value == 1) {
                    userExport.dataExport = userTable.rows;
                    return;
                }

                const resultUser = await userService.findAllExport();
                userExport.dataExport = formatRowUserDto(resultUser);
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo exportar los usuarios"));
            }
        }

        const searchUser = async () => {
            try {
                userTable.loading = true;
                verifyFilters(userSearcher);

                const result = await userService.search(userSearcher);
                userTable.pagination.rowsNumber = result.total;
                userTable.rows = formatRowUserDto(result.users);

                userTable.loading = false;
            } catch (error) {
                console.log(error);
                $q.notify(errorNotify("No se pudo buscar los usuarios"));
                userTable.loading = false;
            }
        }

        const onRequest = (props) => {
            userSearcher.page = props.pagination.page;
            userSearcher.pageSize = props.pagination.rowsPerPage;

            userTable.pagination = props.pagination;
            searchUser();
        }

        const showConfirmModal = (row: RowUserDto) => {
            const message = '¿Estás seguro que deseas ' + ((row.isActive) ? 'dar de baja' : 'restaurar') +
                ' el usuario seleccionado?';

            userConfirmModal.toggleConfirmModal = true;
            userConfirmModal.userRow = row;
            userConfirmModal.message = message;
        }

        const closeConfirmModal = () => {
            userConfirmModal.toggleConfirmModal = false;
        }

        const updateActiveUser = async (result: boolean) => {
            if (result) {
                const userDto = {
                    isActive: !userConfirmModal.userRow.isActive
                } as UpdateUserDto;

                await userService.update(userConfirmModal.userRow.id, userDto);
                $q.notify(successNotify('Se ha actualizado el estado del usuario correctamente'));
            }

            searchUser();
        }

        onMounted(() => {
            searchUser();
        });

        return {
            ...toRefs(userForm),
            ...toRefs(userSearcher),
            ...toRefs(columnsOrder),
            ...toRefs(userTable),
            ...toRefs(userConfirmModal),
            ...toRefs(userExport),
            onUpdateSearcher,
            onUpdateActive,
            onUpdateInactive,
            onUpdateSortBy,
            onUpdateDescending,
            onSearch,
            onReset,
            showFormUser,
            closeFormUser,
            onRequest,
            showConfirmModal,
            closeConfirmModal,
            updateActiveUser,
            showExportModal,
            closeExportModal,
            exportUsers
        }
    }
});