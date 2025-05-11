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