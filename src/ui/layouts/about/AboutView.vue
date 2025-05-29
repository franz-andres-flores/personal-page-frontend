<template>
    <q-layout>
        <navbar />
        <div class="about-view">
            <div class="container">
                <div class="row q-mt-md">
                    <div class="col-12 col-sm-6">
                        <h2 class="about-view-title">
                            Sobre mí
                        </h2>
                        <p class="about-view-paragraph">
                            Soy Ingeniero en Sistemas, especializado en desarrollo frontend con Vue 3 y Angular.
                            En el backend, tengo amplia experiencia con Nest JS, Node.js y Express,
                            siendo Nest JS mi mayor fortaleza. Además, he trabajado con bases de datos MySQL y MongoDB.
                        </p>
                        <p class="about-view-paragraph">
                            Me gradué de la Universidad Nacional de Loja y actualmente trabajo en Clipp Movilidad,
                            donde continúo mejorando mis habilidades y contribuyendo a proyectos innovadores.
                            Me apasiona crear aplicaciones web eficientes, escalables y amigables para el usuario.
                        </p>
                    </div>
                    <div class="col-12 col-sm-6 about-view-image">
                        <img src="@/assets/images/admin/Franz.jpg" alt="Imagen Franz Andrés Flores Gallardo"
                            height="400" />
                    </div>
                </div>
            </div>
        </div>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AboutView',
    setup() {
        return {}
    }
});
</script>

<style lang="scss">
.about-view {
    &-title {
        font-family: "Roboto", "-apple-system", "Helvetica Neue";
        font-weight: 400;
        margin-top: 2%;
        margin-bottom: 4%;
        font-size: 4.2rem;
        color: var(--q-primary) !important;
    }

    &-paragraph {
        text-align: justify;
        font-size: 1.2rem;
        color: var(--q-primary) !important;
    }

    &-image {
        display: flex;
        justify-content: center;
    }

}
</style>