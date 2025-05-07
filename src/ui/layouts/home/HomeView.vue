<template>
    <q-layout>
        <toolbar />
        <div class="home-view">
            <div class="container">
                <ul class="social-icons pt-3">
                    <li class="social-item">
                        <a class="social-link text-light" href="https://www.facebook.com/franz.flores.7"
                            target="_blank"> <q-icon class="fab fa-facebook" /></a>
                    </li>
                    <li class="social-item">
                        <a class="social-link text-light" href="https://x.com/franzandresflo" target="_blank"><i
                                class="ti-twitter" aria-hidden="true"></i></a>
                    </li>
                    <li class="social-item">
                        <a class="social-link text-light" href="https://github.com/FranzAndresFlores" target="_blank"><i
                                class="ti-github" aria-hidden="true"></i></a>
                    </li>
                    <li class="social-item">
                        <a class="social-link text-light" href="https://linkedin.com/in/franz-flores-945441238"
                            target="_blank"><i class="ti-linkedin" aria-hidden="true"></i></a>
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
.home {
    &-toolbar {
        background-color: #141F2C;

        &__btns {
            color: #ECECEC !important;
        }

        .text-primary {
            color: #ECECEC !important;
        }
    }

    &-footer {
        letter-spacing: 2.6px;
        font-size: 0.8rem;
        margin-left: 2vw;
        background-color: #141F2C;
    }
}
</style>