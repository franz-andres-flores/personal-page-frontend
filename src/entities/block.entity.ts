import { BlockMultimediaAlign, BlockProvider, BlockType } from "@/helpers/enum";
import { Publication } from "./publication.entity";

export interface BlockDetails {
    align: BlockMultimediaAlign;
    width: number;
    height: string;
}

export interface Block {
    id: number;
    order: number;
    type: BlockType;
    provider: BlockProvider;
    identifier: string;
    content: string;
    image: string;
    imagePublicId: string;
    details: BlockDetails;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
    publication: Publication;
}
