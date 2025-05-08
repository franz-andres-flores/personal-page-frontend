<template>
    <div class="toolbar-component">
        <q-toolbar class="toolbar-component-container">
            <q-tabs v-model="option" @update:model-value="changeOption">
                <q-tab v-for="(opt, index) in options" :key="index" :name="opt.value" :label="opt.label" />
            </q-tabs>
        </q-toolbar>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import router from '@/router';

export default defineComponent({
    name: 'ToolbarComponent',
    setup() {
        const config = reactive({
            option: 'home',
            options: [
                { label: 'Inicio', value: 'home' },
                { label: 'Sobre mí', value: 'about' },
                { label: 'Experiencia', value: 'experience' },
                { label: 'Educación', value: 'education' },
                { label: 'Proyectos', value: 'projects' },
                { label: 'Blog', value: 'blog' },
                { label: 'Contáctame', value: 'contacts' },
            ]
        });

        const changeOption = (option: string) => {
            config.option = option;
            switch (option) {
                case 'home':
                    return router.push(`/`);
                case 'about':
                    return router.push('/about');
                case 'experience':
                    return router.push('/experience');
                case 'education':
                    return router.push('/education');
                case 'projects':
                    return router.push('/projects');
                case 'blog':
                    return router.push('/blog');
                case 'contacts':
                    return router.push('/contacts');
                default:
                    break;
            }
        }

        return {
            ...toRefs(config),
            changeOption
        }
    }
});
</script>

<style lang="scss">
.toolbar-component {
    &-container {
        background-color: #f8f9fa;
        color: #F85C70 !important;
        font-weight: bold;
    }
}
</style>