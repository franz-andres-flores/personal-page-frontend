<template>
    <q-layout>
        <navbar />
        <div class="home-view">
            <div class="container">
                <div class="home-view-social-media ">
                    <ul class="social-icons pt-3">
                        <li class="social-item">
                            <a class="social-link text-light" href="https://www.facebook.com/franz.flores.7"
                                target="_blank"><q-icon class="fab fa-facebook" /></a>
                        </li>
                        <li class="social-item">
                            <a class="social-link text-light" href="https://x.com/franzandresflo" target="_blank">
                                <q-icon class="fab fa-x-twitter" />
                            </a>
                        </li>
                        <li class="social-item">
                            <a class="social-link text-light" href="https://github.com/franz-andres-flores" target="_blank">
                                <q-icon class="fab fa-square-github" />
                            </a>
                        </li>
                        <li class="social-item">
                            <a class="social-link text-light" href="https://linkedin.com/in/franz-flores-945441238"
                                target="_blank">
                                <q-icon class="fab fa-linkedin" />
                            </a>
                        </li>
                    </ul>
                </div>
                

                <div class="home-content">
                    <h1 class="home-title">Franz Flores</h1>
                    <h6 class="home-mono">Full Stack Developer</h6>
                    <div class="home-btns">
                        <a class="btn btn-separator btn-lg btn-experience" @click="redirectToExperience">Ver
                            Experiencia</a>
                        <a class="btn btn-lg btn-experience" @click="redirectToProjects">Ver Proyectos</a>
                    </div>
                </div>

            </div>
        </div>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import router from '@/router';

export default defineComponent({
    name: 'PrincipalView',
    setup() {
        const config = reactive({
            tab: '',
            option: 'home',
            options: [
                { label: 'Principal', value: 'home' },
                { label: 'Inicio de Sesión', value: 'login' },
            ]
        });

        const changeOption = (option: string) => {
            switch (option) {
                case 'home':
                    return router.push(`/home`);
                case 'login':
                    return router.push('/login');
                default:
                    break;
            }
        }

        const redirectToExperience = () => {
            router.push('/experience');
        }

        const redirectToProjects = () => {
            router.push('/projects');
        }

        return {
            ...toRefs(config),
            changeOption,
            redirectToExperience,
            redirectToProjects
        }
    }
});
</script>

<style lang="scss">
.home-view {
    position: relative;
    background-color: var(--q-primary);
    background-size: cover;
    background-position: center;
    color: #fff;

    .home-view::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .home-content {
        position: relative;
        z-index: 2;
    }

    .text-light {
        color: #f8f9fa !important;
    }

    a.text-light:hover,
    a.text-light:focus {
        color: #cbd3da !important;
    }

    .home-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 109px);
        flex-direction: column;
    }

    .home-title {
        font-size: calc(40px + (120 - 40) * ((100vw - 300px) / (1600 - 300)));
        font-weight: bold;
        line-height: .7;
        margin-bottom: 25px;
        color: #cbd3da;
    }

    .home-subtitle {
        font-weight: 200;
        font-size: calc(20px + (45 - 20) * ((100vw - 300px) / (1600 - 300)));
    }

    .home-mono {
        letter-spacing: 5px;
        font-weight: 500;
        font-size: calc(12px + (19 - 12) * ((100vw - 300px) / (1600 - 300)));
        margin-bottom: 40px;
    }

    .btn-separator {
        margin-right: 10px;
    }

    &-toolbar {
        background-color: #141F2C;

        &__btns {
            color: #ECECEC !important;
        }

        .text-primary {
            color: #ECECEC !important;
        }
    }

    .btn-secondary {
        background-color: var(--q-secondary);
    }

    &-footer {
        letter-spacing: 2.6px;
        font-size: 0.8rem;
        margin-left: 2vw;
        background-color: #141F2C;
    }

    .btn-experience {
        background-color: #1c2434 !important;
        color: #FFF;
    }

    .btn-experience:hover {
        background-color: #2a3244 !important;
        color: #fff;
    }
}

@media (max-width: 992px) {
    .home-view {
        &-social-media {
            display: flex;
            justify-content: center;
        }

        .social-item {
            margin: 0px 15px;
        }
    }
}

</style>