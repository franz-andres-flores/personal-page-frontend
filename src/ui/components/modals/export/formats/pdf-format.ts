import { ExportField } from "../interfaces/export-fields";

export const formatHeaderPDF = (fields: ExportField[]) => {
    const headers = [[]] as string[][];
    fields.map(x => {
        headers[0].push(x.label);
    });
    return headers;
}

export const formatDataPDF = (fields: ExportField[], data) => {
    const rows = [] as string[][];

    for (const obj of data) {
        const row = [] as string[];
        fields.map(x => {
            row.push(obj[`${x.name}`] ?? '');
        });
        rows.push(row);
    }

    return rows;
}

export const formatDataStyledPDF = (fields: ExportField[], data) => {
    const rows = [] as any;
    for (const obj of data) {
        const row = [] as any;
        fields.map(x => {
            row.push({
                styles: { minCellWidth: 50 },
                content: obj[`${x.name}`]
            });
        });

        rows.push(row);
    }

    return rows;
}