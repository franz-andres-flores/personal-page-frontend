export interface FindAutocompleteDto {
    searcher?: string;
}

export interface SearchDto {
    page: number;
    pageSize: number;
    searcher?: string;
    active: boolean;
    inactive: boolean;
    sort_by?: string;
    descending?: boolean;
}

export interface OptionDto {
    label: string;
    value: number | string;
}