
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useQuasar } from 'quasar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { errorNotify } from '@/helpers/utilities';
import { ExportProps } from './interfaces/export-props';
import { ExportField } from './interfaces/export-fields';
import { formatDataPDF, formatExcelFields, formatHeaderPDF } from './formats';
import { getExportOptions } from './options/export-options';
import { generateHeaderPDF } from './exports/pdf';

export default defineComponent({
    name: 'ExportModalComponent',
    props: {
        show_export_modal: {
            type: Boolean
        },
        fields: {
            type: Array as () => ExportField[],
            required: true
        },
        data_export: {
            type: Array,
            required: true
        },
        option_data: {
            type: Number,
            default: 0
        },
        file_name: {
            type: String
        },
        service: {
            type: String
        }
    },
    setup(props: ExportProps, { emit }) {
        const toggleExportDialog = computed({
            get() { return props.show_export_modal },
            set(newValue) { emit('update:show_export_modal', newValue) }
        });

        const optionProp = computed({
            get() { return props.option_data },
            set(newValue) { emit('update:option_data', newValue) }
        });

        const dataProp = computed({
            get() { return props.data_export },
            set(newValue) {
                emit('update:data_export', newValue)
            }
        });

        const exportNames = reactive({
            fileName: props.file_name ?? 'file',
            service: props.service ?? ''
        });

        const exportFields = reactive({
            toggleExportField: false,
            fields: props.fields,
            fieldsToExportExcel: formatExcelFields(props.fields),
            fieldsToExportPDF: formatHeaderPDF(props.fields)
        });

        const exportSize = reactive({
            enableDropdown: true,
            sizeOptions: getExportOptions(),
            size: '',
        });

        const $q = useQuasar();

        const showFieldModal = () => {
            exportFields.toggleExportField = true;
        }

        const closeFieldModal = () => {
            exportFields.toggleExportField = false;
        }

        const updateFieldsSelected = (fields: ExportField[]) => {
            exportFields.fields = fields;
            exportFields.fieldsToExportExcel = formatExcelFields(fields);
            exportFields.fieldsToExportPDF = formatHeaderPDF(fields);
        }

        const selectSizeOption = (value: number) => {
            emit('update:size_option', value);
            exportSize.enableDropdown = false;
        };

        const cancelOption = () => {
            emit('update:show_export_modal', false);
        }

        const closeWindowDownload = () => {
            if (props.option_data == 0) {
                return $q.notify(errorNotify("Por favor seleccione un tipo de información"));
            }
            cancelOption();
        }

        const exportPdfFile = () => {
            const doc = new jsPDF("landscape");

            generateHeaderPDF(doc);

            if (exportNames.service != '') {
                doc.setFontSize(11);
                doc.text("Reporte de " + exportNames.service, 20, 30);
            }

            autoTable(doc, {
                head: exportFields.fieldsToExportPDF,
                body: formatDataPDF(exportFields.fields, props.data_export),
                startY: 35,
                pageBreak: 'auto',
                rowPageBreak: 'avoid',
                theme: 'grid'
            });

            doc.save(`${exportNames.fileName}.pdf`);
            cancelOption();
        }

        return {
            ...toRefs(exportFields),
            ...toRefs(exportSize),
            ...toRefs(exportNames),
            showFieldModal,
            closeFieldModal,
            updateFieldsSelected,
            selectSizeOption,
            toggleExportDialog,
            optionProp,
            dataProp,
            cancelOption,
            exportPdfFile,
            closeWindowDownload,
        }
    }
});