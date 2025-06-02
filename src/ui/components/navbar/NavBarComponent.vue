<template>
    <nav class="navbar-component navbar navbar-expand-lg ">
        <a class="q-pl-md navbar-brand" href="#">
            <img src="@/assets/images/logo/logo.png" alt="Logo" width="60" height="60" />
        </a>
        <button class="navbar-toggler navbar-component-btn-menu" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation"
            @click="toggleMenu">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: menuVisible || isDesktop }">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li v-for="(opt, index) in options" :key="index" @click="changeOption(opt.value)">
                    <button class="nav-link">{{ opt.label }}</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import router from '@/router';

export default defineComponent({
    name: 'NavBarComponent',
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
            ],
            menuVisible: false,
            isDesktop: window.innerWidth >= 992
        });

        const toggleMenu = () => {
            config.menuVisible = !config.menuVisible;
        }

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


        const handleResize = () => {
            config.isDesktop = window.innerWidth >= 992
            if (config.isDesktop) {
                config.menuVisible = false
            }
        }

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        })

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        })

        return {
            ...toRefs(config),
            changeOption,
            toggleMenu
        }
    }
});
</script>

<style lang="scss">
.navbar-component {
    background-color: var(--q-primary);

    .nav-link {
        color: #fff;
    }

    &-btn-menu {
        margin-right: 10px;
        border: #fff;
    }

    .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
    }
}

@media (min-width: 992px) {
    .navbar-component {
        max-height: 50px;
    }
}
</style>