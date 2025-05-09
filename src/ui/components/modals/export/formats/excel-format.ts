import { ExportField } from "../interfaces/export-fields";

export const formatExcelFields = (fields: ExportField[]) => {
    const fieldsExport = {} as any;
    fields.map(x => {
        fieldsExport[`${x.label}`] = x.name;
    });
    return fieldsExport;
}