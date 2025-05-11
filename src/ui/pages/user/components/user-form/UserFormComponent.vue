<template>
    <q-dialog v-model="showFormModal" persistent>
        <q-card style="width: 860px; max-width: 87vw;">
            <div class="form-passenger">
                <q-card-section>
                    <div class="text-h6">
                        <div class="header-form">
                            <div>{{ title }}</div>
                            <q-btn color="negative" icon="close" v-close-popup>
                                <q-tooltip>Cerrar ventana</q-tooltip>
                            </q-btn>
                        </div>
                    </div>
                </q-card-section>

                <q-card-section>
                    <q-form @submit="onSubmit">
                        <div class="row">
                            <div class="col-12 col-md-6 q-pa-sm">
                                <q-input filled v-model="firstName" label="Nombres *" hint="Nombres del usuario"
                                    lazy-rules :dense="true" clearable :rules="validationRules.textFieldRequired" />
                            </div>

                            <div class="col-12 col-md-6 q-pa-sm">
                                <q-input filled v-model="lastName" label="Apellidos *" hint="Apellidos del usuario"
                                    lazy-rules :dense="true" clearable :rules="validationRules.textFieldRequired" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-6 q-pa-sm">
                                <q-input filled v-model="email" type="email" label="Correo electrónico *"
                                    hint="Correo electrónico de usuario" lazy-rules :dense="true"
                                    :rules="validationRules.textFieldRequired" clearable />
                            </div>

                            <div class="col-12 col-sm-6 q-pa-sm">
                                <UserRoleSelectComponent :value="role" @role_selected="onSelectRole" />
                            </div>
                        </div>

                        <div v-if="isCreateAction" class="row">
                            <div class="col-12 col-sm-12 q-pa-sm">
                                <q-input filled :type="isPwd ? 'password' : 'text'" v-model="password"
                                    placeholder="Ingresa tu contraseña" label="Contraseña" stack-label lazy-rules
                                    :rules="[val => val !== null && val.length > 0 || 'Campo requerido']"
                                    autocomplete="on" :dense="true">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                            @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>
                            </div>
                        </div>

                        <q-card-actions align="center" class="text-primary">
                            <q-btn color="primary" label="Guardar" type="submit" @keydown.enter.prevent />
                            <q-btn color="negative" label="Cancelar" v-close-popup />
                        </q-card-actions>

                    </q-form>
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import UserFormComponent from './UserFormComponent';
export default UserFormComponent;
</script>