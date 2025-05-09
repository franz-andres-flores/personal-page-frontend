import { QTableProps } from 'node_modules/quasar/dist/types/index';

export interface TableData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any;
    columns: QTableProps['columns'];
    pagination: {
        sortBy: string;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    },
    dense?: boolean;
    loading?: boolean;
}