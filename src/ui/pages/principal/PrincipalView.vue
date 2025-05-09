<template>
    <q-layout class="custom-layout">
        <div class="container">
            <div class="header">
                <h2 class="title">Bienvenido de Nuevo {{ user.firstName + " " + user.lastName }}</h2>
            </div>
        </div>
    </q-layout>
</template>

<script lang="ts">
import { getUserFromLocalStorage } from '@/helpers/utilities';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    name: 'PrincipalView',
    setup() {

        const config = reactive({
            user: getUserFromLocalStorage()
        });

        return {
            ...toRefs(config),
        }
    }
});
</script>
