import { computed, defineComponent, reactive, toRefs } from "vue";

import { CreateJobDto, RowJobDto } from "@/dto";
import { getUserFromLocalStorage } from "@/helpers/utilities";


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
    setup(props: Props, { emit }) {
        const showFormModal = computed({
            get() { return props.toggleFormModal },
            set(newValue) { emit('update:toggleFormModal', newValue) }
        });

        const config = reactive({
            isCreateAction: (props.job?.id) ? false : true,
            title: ((props.job?.id) ? 'Editar' : 'Crear') + ' Usuario',
            user: getUserFromLocalStorage(),
        });

        // const createJobDto: CreateJobDto = {
        //     company: props.job?.company ?? '',
        //     position: props.job?.position ?? '',
        //     // start_month: props.job?.start_month ?? ;
        //     // start_year: number;
        //     // end_month: number;
        //     // end_year: number;
        //     // description: string;
        //     // technologies: JobTechnology;
        // }

        return {
            ...toRefs(config),
            showFormModal
        }
    }
});