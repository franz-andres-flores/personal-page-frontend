<template>
    <q-layout class="custom-layout">
        <div class="signin-view">
            <div class="row signin-layout-form-container">
                <div class="col-12 col-md-3">
                    <h3 class="signin-layout-title">
                        Iniciar Sesión
                    </h3>

                    <q-form @submit="onSubmit">
                        <q-input filled type="text" v-model="email" label="Usuario" stack-label
                            placeholder="Ingresa tu usuario" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Campo requerido']" />

                        <q-input filled :type="isPwd ? 'password' : 'text'" v-model="password"
                            placeholder="Ingresa tu contraseña" label="Contraseña" stack-label lazy-rules
                            :rules="[val => val !== null && val.length > 0 || 'Campo requerido']" autocomplete="on">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="isPwd = !isPwd" />
                            </template>
                        </q-input>

                        <div class="center-content">
                            <q-btn label="Iniciar sesión" type="submit" color="primary" />
                        </div>
                    </q-form>
                </div>
            </div>
        </div>
    </q-layout>
</template>

<script lang="ts">
import LoginView from './LoginView';
export default LoginView;
</script>

<style lang="scss" src="./LoginView.scss"></style>