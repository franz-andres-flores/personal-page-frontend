<template>
    <q-dialog v-model="showFormModal" persistent>
        <q-card style="width: 700px; max-width: 75vw;">
            <div class="form-study">
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
                                <q-input filled v-model="institution" label="Institución *"
                                    hint="Institución del estudio" lazy-rules :dense="true" clearable
                                    :rules="validationRules.textFieldRequired" />
                            </div>

                            <div class="col-12 col-sm-6 q-pa-sm">
                                <q-input filled v-model="degree" label="Titulación *" hint="Titulación realizada"
                                    lazy-rules :dense="true" clearable :rules="validationRules.textFieldRequired" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 q-pa-sm">
                                <q-input v-model="description" :dense="true" label="Descripción"
                                    hint="Descripción del estudio" filled type="textarea"
                                    :rules="validationRules.textFieldRequired" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 col-sm-6 q-pa-sm">
                                <YearSelectComponent :value="startYear" :hint="'Año de Inicio'"
                                @month_selected="onSelectStartYear" />
                            </div>
                            <div class="col-12 col-sm-6 q-pa-sm">
                                <YearSelectComponent :value="endYear" :hint="'Año de Finalización'"
                                @month_selected="onSelectEndYear" />
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
import StudyFormComponent from './StudyFormComponent';
export default StudyFormComponent;
</script>