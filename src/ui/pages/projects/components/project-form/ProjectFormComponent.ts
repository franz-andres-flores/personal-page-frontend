import { CreateProjectDto, RowProjectDto, UpdateProjectDto } from "@/dto";
import { JobTechnology, ProjectTechnology } from "@/entities";
import { errorNotify, getUserFromLocalStorage, messageLoading, successNotify, validationRules } from "@/helpers/utilities";
import projectService from "@/services/project.service";
import { Loading, useQuasar } from "quasar";
import { computed, defineComponent, reactive, toRefs } from "vue";

interface Props {
    toggleFormModal?: boolean;
    project?: RowProjectDto;
}

export default defineComponent({
    name: 'ProjectFormComponent',
    props: {
        toggleFormModal: { type: Boolean },
        project: { type: Object as () => RowProjectDto },
    },
    setup(props: Props, { emit }) {
        const showFormModal = computed({
            get() { return props.toggleFormModal },
            set(newValue) { emit('update:toggleFormModal', newValue) }
        });

        const config = reactive({
            isCreateAction: (props.project?.id) ? false : true,
            title: ((props.project?.id) ? 'Editar' : 'Crear') + ' Proyecto',
            user: getUserFromLocalStorage(),
        });

        const createProjectDto: CreateProjectDto = reactive({
            name: props.project?.name ?? '',
            description: props.project?.description ?? '',
            technologies: props.project?.technologies ?? [] as ProjectTechnology[],
            urlRepository: props.project?.urlRepository ?? '',
        });

        const $q = useQuasar();

        const onSubmit = async () => {
            try {
                Loading.show(messageLoading('Se está guardando la información del proyecto'));

                if (config.isCreateAction) {
                    await projectService.create(createProjectDto);

                    Loading.hide();
                    $q.notify(successNotify('Se ha guardado el proyecto correctamente'));
                    emit('update:toggleFormModal', true);
                    return;
                }

                const updateProjectDto = { ...createProjectDto } as UpdateProjectDto;
                await projectService.update(props.project?.id ?? 0, updateProjectDto);

                Loading.hide();
                $q.notify(successNotify('Se ha editado el proyecto correctamente'));
                emit('update:toggleFormModal', true);
                return;
            } catch (error) {
                console.log(error);
                Loading.hide();
                $q.notify(errorNotify('No se ha podido guardar la información'));
            }
        }

        return {
            ...toRefs(config),
            ...toRefs(createProjectDto),
            showFormModal,
            validationRules,
            onSubmit
        }
    }
});