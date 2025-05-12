<template>
    <q-dialog v-model="showFormModal" persistent>
        <q-card style="width: 700px; max-width: 75vw;">
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
                            <div class="col-12 col-sm-6 q-pa-sm">
                                <q-input filled v-model="company" label="Empresa *" hint="Empresa en la cual laboró"
                                    lazy-rules :dense="true" clearable :rules="validationRules.textFieldRequired" />
                            </div>

                            <div class="col-12 col-sm-6 q-pa-sm">
                                <q-input filled v-model="position" label="Cargo *"
                                    hint="Cargo o posición dentro de la empresa" lazy-rules :dense="true" clearable
                                    :rules="validationRules.textFieldRequired" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-sm-6 q-pa-sm">
                                <MonthSelectComponent :value="startMonth" :hint="'Mes de Inicio'"
                                    @month_selected="onSelectStartMonth" />
                            </div>

                            <div class="col-12 col-sm-6 q-pa-sm">
                                <YearSelectComponent :value="startYear" :hint="'Año de Inicio'"
                                    @month_selected="onSelectStartYear" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 q-pa-sm">
                                <q-input v-model="description" :dense="true" label="Descripción"
                                    hint="Descripción del empleo" filled type="textarea"
                                    :rules="validationRules.textFieldRequired" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 q-pa-sm">
                                <q-select label="Tecnologías" filled v-model="technologies" use-input use-chips multiple
                                    hide-dropdown-icon input-debounce="0" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 q-pa-sm">
                                <q-toggle v-model="isCurrentJob" label="¿Es el empleo actual?" />
                            </div>
                        </div>

                        <div v-if="!isCurrentJob" class="row">
                            <div class="col-12 col-sm-6 q-pa-sm">
                                <MonthSelectComponent :value="startMonth" :hint="'Mes de Finalización'"
                                    @month_selected="onSelectStartMonth" />
                            </div>

                            <div class="col-12 col-sm-6 q-pa-sm">
                                <YearSelectComponent :value="startYear" :hint="'Año de Finalización'"
                                    @month_selected="onSelectStartYear" />
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
import JobFormComponent from './JobFormComponent';
export default JobFormComponent;
</script>