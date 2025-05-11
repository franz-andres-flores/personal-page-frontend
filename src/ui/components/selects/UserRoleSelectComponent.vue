<template>
    <q-select filled v-model="role" :options="roleOptions" label="Rol" @update:modelValue="selectRole" :dense="true" />
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import { OptionDto } from '@/dto';
import { getUserRoleOption, getUserRoles } from '@/helpers/options';

interface Props {
    value?: number;
}

export default defineComponent({
    name: 'RoleSelectComponent',
    props: {
        value: { type: Number },
    },
    emits: ['role_selected'],
    setup(props: Props, { emit }) {
        const data = reactive({
            role: '',
            roleOptions: getUserRoles()
        });

        if (props.value != undefined) {
            const role = getUserRoleOption(props.value);
            data.role = role?.label ?? '';
        }

        const selectRole = (option: OptionDto) => {
            emit('role_selected', option);
        }

        return {
            ...toRefs(data),
            selectRole
        }
    }
})
</script>