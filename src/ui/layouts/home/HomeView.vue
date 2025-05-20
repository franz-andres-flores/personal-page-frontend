<template>
    <q-layout>
        <navbar />
        <div class="home-view">
            <div class="container">
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

                <div class="home-content">
                    <h1 class="home-title">Franz Flores</h1>
                    <h6 class="home-mono">Full Stack Developer</h6>
                    <div class="home-btns">
                        <a class="btn btn-primary btn-separator">Ver Experiencia</a>
                        <a class="btn btn-secondary">Ver Portafolio</a>
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


        return {
            ...toRefs(config),
            changeOption
        }
    }
});
</script>

<style lang="scss">
.home-view {
    background-color: var(--q-primary);
    color: #fff;

    /*social icons*/
    .text-light {
        color: #f8f9fa !important;
    }

    a.text-light:hover,
    a.text-light:focus {
        color: #cbd3da !important;
    }

    /*container*/
    .home-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 109px); /* changed from 83vh */
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
}
</style>