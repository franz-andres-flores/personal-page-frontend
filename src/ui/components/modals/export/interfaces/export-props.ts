import { ExportField } from "./export-fields";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExportProps {
    show_export_modal?: boolean;
    fields: ExportField[];
    option_data?: number;
    data_export: Array<any>;
    file_name?: string;
    service?: string;
}