import { computed, defineComponent, reactive, toRefs } from "vue";
import { Loading, useQuasar } from "quasar";

import { CreateCourseDto, RowCourseDto, UpdateCourseDto } from "@/dto";
import { errorNotify, getCurrentDate, getUserFromLocalStorage, messageLoading, successNotify, validationRules } from "@/helpers/utilities";
import courseService from "@/services/course.service";
import DatePickerComponent from "@/ui/components/datepickers/DatePickerComponent.vue";

interface Props {
    toggleFormModal?: boolean;
    course?: RowCourseDto;
}

export default defineComponent({
    name: 'CourseFormComponent',
    props: {
        toggleFormModal: { type: Boolean },
        course: { type: Object as () => RowCourseDto },
    },
    components: {
        DatePickerComponent
    },
    setup(props: Props, { emit }) {
        const showFormModal = computed({
            get() { return props.toggleFormModal },
            set(newValue) { emit('update:toggleFormModal', newValue) }
        });

        const config = reactive({
            isCreateAction: (props.course?.id) ? false : true,
            title: ((props.course?.id) ? 'Editar' : 'Crear') + ' Curso',
            user: getUserFromLocalStorage(),
        });

        const createCourseDto: CreateCourseDto = reactive({
            institution: props.course?.institution ?? '',
            title: props.course?.title ?? '',
            date: props.course?.date ?? getCurrentDate(),
            description: props.course?.description ?? ''
        });

        const $q = useQuasar();

        const onSelectDate = (date: string) => {
            createCourseDto.date = date;
        }

        const onSubmit = async () => {
            try {
                Loading.show(messageLoading('Se están guardando la información del curso'));

                if (config.isCreateAction) {
                    await courseService.create(createCourseDto);

                    Loading.hide();
                    emit('update:toggleFormModal', true);
                    $q.notify(successNotify('Se ha guardado la información del curso correctamente'));
                    return;
                }

                const updateCourseDto = { ...createCourseDto } as UpdateCourseDto;
                await courseService.update(props.course?.id ?? 0, updateCourseDto);

                Loading.hide();
                emit('update:toggleFormModal', true);
                $q.notify(successNotify('Se ha guardado la información del curso correctamente'));
            } catch (error) {
                console.log(error);
                Loading.hide();
                $q.notify(errorNotify('No se pudo guardar los datos del curso'));
            }
        }

        return {
            ...toRefs(config),
            ...toRefs(createCourseDto),
            showFormModal,
            validationRules,
            onSelectDate,
            onSubmit
        }
    }
});