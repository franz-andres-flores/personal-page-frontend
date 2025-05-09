/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, inject, reactive, toRefs, watch } from 'vue';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

import { TableProps } from './interfaces/table-props.interface';
import { TableData } from './interfaces/table-data.interface';
import { getAdministratorFromLocalStorage } from "@/helpers/utilities";
import { TableStyle } from './enums/type-style';
import DatePickerComponent from '../datepickers/DatePickerComponent.vue';

export default defineComponent({
    name: 'TableComponent',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        messageNotData: {
            type: String,
            default: 'No existen registros'
        },
        titleTable: {
            type: String,
            default: ''
        },
        isEditEnable: {
            type: Boolean,
            default: false
        },
        isEraseEnable: {
            type: Boolean,
            default: false
        },
        isDeleteEnable: {
            type: Boolean,
            default: false
        },
        isRestoreEnable: {
            type: Boolean,
            default: false
        },
        isHistoricEnable: {
            type: Boolean,
            default: false
        },
        isPublicationEnable: {
            type: Boolean,
            default: false
        },
        isCourseEnable: {
            type: Boolean,
            default: false
        },
        isBlocksEnable: {
            type: Boolean,
            default: false
        },
        isLabelPassengerEnable: {
            type: Boolean,
            default: false
        },
        isUserCoursePublicationEnable: {
            type: Boolean,
            default: false
        },
        isViewPublicationEnable: {
            type: Boolean,
            default: false
        },
        enableVisibleColumns: {
            type: Boolean,
            default: false
        },
        enablePagination: {
            type: Boolean,
            default: true
        },
        enableMultipleSelection: {
            type: Boolean,
            default: false
        },
        enableDragAndDrop: {
            type: Boolean,
            default: false
        },
        selectedItems: {
            type: Array,
        },
        isSubservice: {
            type: Boolean,
            default: false
        },
        enableVirtualScroll: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
        },
        rows: {
            type: Array
        },
        columns: {
            type: Array
        },
        denseCheckboxs: {
            type: Boolean,
            default: true
        },
        tableStyle: {
            type: String,
            default: TableStyle.SERVICE
        },
        isAdminTable: {
            type: Boolean,
            default: false
        },
        rowKey: {
            type: String,
            default: 'name'
        }
    },
    components: {
        DatePickerComponent
    },
    setup(props: TableProps, { emit }) {
        const config = reactive({
            dataTable: inject('dataTable') as TableData,
            messageNotData: props.messageNotData,
            messageRowsPerPage: 'Registros por página',
            optionsPagination: (!props.enablePagination) ? [0] : [10, 15, 20, 250],
            selection: ((props.enableMultipleSelection) ? "multiple" : undefined) as any,
            items: (props.selectedItems) ?? [],
            expandedRow: null,
            iconExpanded: 'keyboard_arrow_down'
        });

        const columns = (props.columns as QTableProps['columns']) ?? config.dataTable.columns;
        const columnsTable = columns?.map((x) => {
            return {
                ...x,
                headerClasses: "table-header-text"
            };
        });

        const visibleColumns = reactive({
            visibles: columnsTable?.map((x) => (
                x.name != 'id' &&
                x.name != 'courseId'
            ) ? x.name : '')
        });

        const emitOnRequest = (props) => {
            emit('request', props);
        }

        const emitEditBtn = (props) => {
            emit('edit', props);
        }

        const emitIsActive = (props) => {
            if (props.isAdminTable && props.id == getAdministratorFromLocalStorage().id) {
                emit('delete-admin', null);
                return;
            }
            emit('confirm', props);
        }

        const isConfigBtn = (props) => {
            emit('config', props);
        }

        const emitPublicationBtn = (props) => {
            emit('publication', props);
        }

        const emitCourseBtn = (props) => {
            emit('course', props);
        }

        const emitUserCoursePublicationBtn = (props) => {
            emit('user-course-publication', props);
        }

        const emitViewPublicationEnable = (props) => {
            emit('view-publications', props);
        }

        const emitBlockBtn = (props) => {
            emit('block', props);
        }

        const emitSelectedItems = (items) => {
            emit('selected-items', items);
        }

        const onClickCell = (row, index) => {
            emit('row-cell', row, index.textContent.trim() ?? '');
        }

        const emitRow = (row) => {
            emit('row-click', row);
        }

        const getTableStyle = () => {
            switch (props.tableStyle) {
                case TableStyle.SERVICE:
                    return 'table-component-sticky-header';
                case TableStyle.SUBSERVICE:
                    return 'table-component-sticky-header-subservice';
                case TableStyle.TAB:
                    return 'table-component-sticky-header-tab';
                case TableStyle.TRACKING:
                    return 'table-component-sticky-header-tracking';
                case TableStyle.DISPATCH_BALLOT:
                    return 'table-component-sticky-header-dispatch-ballot';
                default:
                    return 'table-component-sticky-header';
            }
        }


        let draggedItem;
        const dragStart = (event, row) => {
            draggedItem = row;
            event.dataTransfer.effectAllowed = 'move';
        };

        const dragDrop = (event, row) => {
            const rows = props.rows ?? config.dataTable.rows;
            const draggedRowIndex = rows.findIndex(r => r.id === draggedItem.id);
            const targetRowIndex = rows.findIndex(r => r.id === row.id);

            if (draggedRowIndex !== targetRowIndex) {
                rows.splice(draggedRowIndex, 1);
                rows.splice(targetRowIndex, 0, draggedItem);
            }

            draggedItem = null;
            emit('rows_update', rows);
        };


        const onSelectDate = (row) => {
            emit('date', row);
        }

        watch(() => props.selectedItems, (newVal) => {
            config.items = newVal as any;
        });

        return {
            ...toRefs(config),
            ...toRefs(visibleColumns),
            columnsTable,
            emitOnRequest,
            emitEditBtn,
            emitIsActive,
            isConfigBtn,
            emitSelectedItems,
            onClickCell,
            getTableStyle,
            emitPublicationBtn,
            emitUserCoursePublicationBtn,
            emitCourseBtn,
            emitViewPublicationEnable,
            onSelectDate,
            emitBlockBtn,
            dragStart,
            dragDrop,
            emitRow 
        }
    },
});