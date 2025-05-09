import { OptionDto } from "@/dto";
import { BlockMultimediaAlign } from "../enum";

const multimediaAligns = [
    { value: BlockMultimediaAlign.CENTER, label: 'Centrado' },
    { value: BlockMultimediaAlign.RIGHT, label: 'Alineado a la Derecha' },
    { value: BlockMultimediaAlign.LEFT, label: 'Alineado a la Izquierda' }
] as OptionDto[];

export const getMultimediaAligns = (): OptionDto[] => {
    return multimediaAligns;
}

export const getMultimediaAlignOption = (value: number): OptionDto => {
    return multimediaAligns.find((x) => x.value == value) ?? multimediaAligns[1];
}