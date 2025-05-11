import { computed, defineComponent, reactive, toRefs } from "vue";
import { Loading, useQuasar } from "quasar";

import { errorNotify, getUserFromLocalStorage, messageLoading, successNotify, validationRules } from "@/helpers/utilities";
import { CreateUserDto, OptionDto, RowUserDto, UpdateUserDto } from "@/dto";
import { UserRole } from "@/helpers/enum";
import userService from "@/services/user.service";
import UserRoleSelectComponent from "@/ui/components/selects/UserRoleSelectComponent.vue";

interface Props {
    toggleFormModal?: boolean;
    user?: RowUserDto;
}

export default defineComponent({
    name: 'UserFormComponent',
    components: {
        UserRoleSelectComponent
    },
    props: {
        toggleFormModal: { type: Boolean },
        user: { type: Object as () => RowUserDto },
    },
    setup(props: Props, { emit }) {
        const showFormModal = computed({
            get() { return props.toggleFormModal },
            set(newValue) { emit('update:toggleFormModal', newValue) }
        });

        const config = reactive({
            isCreateAction: (props.user?.id) ? false : true,
            title: ((props.user?.id) ? 'Editar' : 'Crear') + ' Usuario',
            admin: getUserFromLocalStorage(),
            isPwd: true
        });

        const createUserDto: CreateUserDto = reactive({
            firstName: props.user?.firstName ?? '',
            lastName: props.user?.lastName ?? '',
            email: props.user?.email ?? '',
            password: '',
            role: props.user?.role ?? UserRole.USER
        });

        const $q = useQuasar();

        const onSelectRole = (option: OptionDto) => {
            createUserDto.role = option.value as number;
        }

        const onSubmit = async () => {
            try {
                const isCreateAction = (props.user?.id) ? false : true;
                const message = ((isCreateAction) ? 'Guardando' : 'Actualizando') + ' información del usuario';
                Loading.show(messageLoading(message));
                if (isCreateAction) {
                    await userService.create(createUserDto);

                    $q.notify(successNotify('Se ha creado el registro de usuario correctamente'));
                    Loading.hide();
                    emit('update:toggleFormModal', false);
                    return;
                }

                Loading.hide();

                const updateUserDto = {
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    role: createUserDto.role,
                    email: createUserDto.email
                } as UpdateUserDto;

                await userService.update(props.user?.id ?? 0, updateUserDto);
                $q.notify(successNotify('Se ha editado el usuario correctamente'));
                emit('update:toggleFormModal', false);
            } catch (error) {
                console.log(error);
                Loading.hide();
                $q.notify(errorNotify('No se puedo realizar la acción solicitada'));
            }
        }

        return {
            ...toRefs(config),
            ...toRefs(createUserDto),
            showFormModal,
            validationRules,
            onSelectRole,
            onSubmit,
        }
    }
});