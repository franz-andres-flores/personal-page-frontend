<template>
    <q-dialog v-model="showConfirmDialog" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm">{{ message }}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="negative" @click="cancelOption" />
                <q-btn flat label="Aceptar" color="primary" @click="confirmOption" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';

interface Props {
    toggleConfirmModal?: boolean;
    message?: string;
    result?: boolean;
}

export default defineComponent({
    name: 'ConfirmModalComponent',
    props: {
        toggleConfirmModal: { type: Boolean },
        message: { type: String },
        result: { type: Boolean }
    },
    emits: ['update:toggleConfirmModal', 'update:result', 'aux'],
    setup(props: Props, { emit }) {
        
        const showConfirmDialog = computed({
            get() { return props.toggleConfirmModal },
            set(newValue) { emit('update:toggleConfirmModal', newValue) }
        });

        const cancelOption = () => {
            emit('update:toggleConfirmModal', false);
            emit('update:result', false);
        }

        const confirmOption = () => {
            emit('update:result', true);
            emit('aux', true);
            emit('update:toggleConfirmModal', false);
            
        }

        return {
            showConfirmDialog,
            cancelOption,
            confirmOption
        }
    }
});
</script>
