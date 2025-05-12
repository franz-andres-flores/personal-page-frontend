import { computed, defineComponent, reactive, toRefs } from "vue";

import { CreateJobDto, OptionDto, RowJobDto, UpdateJobDto } from "@/dto";
import { errorNotify, fetchCurrentYear, getUserFromLocalStorage, messageLoading, successNotify, validationRules } from "@/helpers/utilities";
import MonthSelectComponent from "@/ui/components/selects/MonthSelectComponent.vue";
import YearSelectComponent from "@/ui/components/selects/YearSelectComponent.vue";
import { JobTechnology } from "@/entities";
import { Loading, useQuasar } from "quasar";
import jobService from "@/services/job.service";


interface Props {
    toggleFormModal?: boolean;
    job?: RowJobDto;
}

export default defineComponent({
    name: 'JobFormComponent',
    props: {
        toggleFormModal: { type: Boolean },
        job: { type: Object as () => RowJobDto },
    },
    components: {
        MonthSelectComponent,
        YearSelectComponent
    },
    setup(props: Props, { emit }) {
        const showFormModal = computed({
            get() { return props.toggleFormModal },
            set(newValue) { emit('update:toggleFormModal', newValue) }
        });

        const config = reactive({
            isCreateAction: (props.job?.id) ? false : true,
            title: ((props.job?.id) ? 'Editar' : 'Crear') + ' Empleo',
            user: getUserFromLocalStorage(),
        });

        const createJobDto: CreateJobDto = {
            company: props.job?.company ?? '',
            position: props.job?.position ?? '',
            startMonth: props.job?.startMonth ?? new Date().getMonth(),
            startYear: props.job?.startYear ?? fetchCurrentYear(),
            description: props.job?.description,
            technologies: [] as JobTechnology[],
            isCurrentJob: props.job?.isCurrentJob ?? true,
            endMonth: props.job?.endMonth,
            endYear: props.job?.endYear
        }

        const $q = useQuasar();

        const onSelectStartMonth = (option: OptionDto) => {
            createJobDto.startMonth = option.value as number;
        }

        const onSelectStartYear = (option: OptionDto) => {
            createJobDto.startYear = option.value as number;
        }

        const onSubmit = async () => {
            try {
                Loading.show(messageLoading('Se están guardando la información del empleo'));
               
                if (config.isCreateAction) {
                    await jobService.create(createJobDto);

                    Loading.hide();
                    emit('update:toggleFormModal', true);
                    $q.notify(successNotify('Se ha guardado la información del empleo correctamente'));
                    return;
                }

                const updateJobDto = { ...createJobDto } as UpdateJobDto;
                await jobService.update(props.job?.id ?? 0, updateJobDto);

                Loading.hide();
                emit('update:toggleFormModal', true);
                $q.notify(successNotify('Se ha guardado la información del empleo correctamente'));
            } catch (error) {
                console.log(error);
                Loading.hide();
                $q.notify(errorNotify('No se pudo guardar los datos del empleo'));
            }
        }

        return {
            ...toRefs(config),
            ...toRefs(createJobDto),
            showFormModal,
            validationRules,
            onSelectStartMonth,
            onSelectStartYear,
            onSubmit,

        }
    }
});