<template>
    <nav class="navbar-component navbar navbar-expand-lg navbar-light bg-light">
        <a class="q-pl-md navbar-brand" href="#">
            <img src="@/assets/images/logo/logo.png" alt="Logo" width="60" height="60" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li v-for="(opt, index) in options" :key="index" @click="changeOption(opt.value)">
                    <button class="nav-link">{{ opt.label }}</button>
                </li>
            </ul>
        </div>
    </nav>
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
            console.log(option);
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
.navbar-component {
    height: 50px;
    max-height: 50px;
}

@media (max-width: 576px) {
    .navbar-component {
        height: 80px;
        max-height: 80px;

        .navbar-nav {
            background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
        }
    }
}
</style>