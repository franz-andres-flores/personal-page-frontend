import { computed, defineComponent, reactive, toRefs } from "vue";
import { Loading, useQuasar } from "quasar";

import { CreateStudyDto, OptionDto, RowStudyDto, UpdateStudyDto } from "@/dto";
import YearSelectComponent from "@/ui/components/selects/YearSelectComponent.vue";
import { errorNotify, fetchCurrentYear, getUserFromLocalStorage, messageLoading, successNotify, validationRules } from "@/helpers/utilities";
import studyService from "@/services/study.service";

interface Props {
    toggleFormModal?: boolean;
    study?: RowStudyDto;
}

export default defineComponent({
    name: 'StudyFormComponent',
    props: {
        toggleFormModal: { type: Boolean },
        study: { type: Object as () => RowStudyDto },
    },
    components: {
        YearSelectComponent
    },
    setup(props: Props, { emit }) {
        const showFormModal = computed({
            get() { return props.toggleFormModal },
            set(newValue) { emit('update:toggleFormModal', newValue) }
        });

        const config = reactive({
            isCreateAction: (props.study?.id) ? false : true,
            title: ((props.study?.id) ? 'Editar' : 'Crear') + ' Estudio',
            user: getUserFromLocalStorage(),
        });

        const createStydyDto: CreateStudyDto = reactive({
            institution: props.study?.institution ?? '',
            degree: props.study?.degree ?? '',
            startYear: props.study?.startYear ?? fetchCurrentYear(),
            endYear: props.study?.endYear,
            isCurrentStudy: props.study?.isCurrentStudy ?? false,
            description: props.study?.description ?? ''
        });

        const $q = useQuasar();

        const onSelectStartYear = (option: OptionDto) => {
            createStydyDto.startYear = option.value as number;
        }

        const onSelectEndYear = (option: OptionDto) => {
            createStydyDto.endYear = option.value as number;
        }

        const onSubmit = async () => {
            try {
                Loading.show(messageLoading('Se están guardando la información del estudio'));

                if (config.isCreateAction) {
                    await studyService.create(createStydyDto);

                    Loading.hide();
                    emit('update:toggleFormModal', true);
                    $q.notify(successNotify('Se ha guardado la información del estudio correctamente'));
                    return;
                }

                const updateStudyDto = { ...createStydyDto } as UpdateStudyDto;
                await studyService.update(props.study?.id ?? 0, updateStudyDto);

                Loading.hide();
                emit('update:toggleFormModal', true);
                $q.notify(successNotify('Se ha guardado la información del estudio correctamente'));
            } catch (error) {
                console.log(error);
                Loading.hide();
                $q.notify(errorNotify('No se pudo guardar los datos del empleo'));
            }
        }

        return {
            ...toRefs(config),
            ...toRefs(createStydyDto),
            showFormModal,
            validationRules,
            onSelectStartYear,
            onSelectEndYear,
            onSubmit
        }
    }
});