import { OptionDto } from "@/dto";
import { BlockType } from "../enum";

const blockTypes = [
    { value: BlockType.TEXT, label: 'Texto' },
    { value: BlockType.IMAGE, label: 'Imagen' },
] as OptionDto[];

export const getBlockTypes = (): OptionDto[] => {
    return blockTypes;
}

export const getBlockTypeOption = (value: number): OptionDto => {
    return blockTypes.find((x) => x.value == value) ?? blockTypes[1];
}