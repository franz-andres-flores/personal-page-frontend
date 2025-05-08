export interface ProjectTechnology {
    name: string;
}

export interface ProjectImage {
    image: string;
    imagePublicId: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    technologies: ProjectTechnology;
    url_repository: string;
    images: ProjectImage;
    isActive: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}

