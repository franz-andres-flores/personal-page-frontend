import { OptionDto } from "@/dto";

const exportOptions = [
    { label: 'Página actual', value: 1 }, 
    { label: 'Todos los datos', value: 2 }
] as OptionDto[];

export const getExportOptions = (): OptionDto[] => {
    return exportOptions;
}

export const getExportOption = (value: number): OptionDto => {
    return exportOptions.find((x) => x.value == value) ?? exportOptions[0];
}