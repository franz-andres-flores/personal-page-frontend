import { OptionDto } from "@/dto";

const sizeExportOptions = [
    { value: 1, label: 'Página Actual' },
    { value: 2, label: 'Todos los Datos' }
] as OptionDto[];

export const getSizeExportOptions = (): OptionDto[] => {
    return sizeExportOptions;
}

export const getSizeExportOption = (value: number): OptionDto => {
    return sizeExportOptions.find((x) => x.value == value) ?? sizeExportOptions[0];
}
