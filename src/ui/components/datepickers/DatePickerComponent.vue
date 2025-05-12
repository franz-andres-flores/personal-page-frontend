<template>
    <q-input filled v-model="date" mask="####-##-##" :dense="true" :label="label" :hint="hint" :disable="disable"
        @update:modelValue="selectDate">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="YYYY-MM-DD" @update:modelValue="selectDate">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useQuasar } from 'quasar';

import { formatGenericDate, getCurrentDate, parseToUtcDateTime, validateDate, warningNotify } from '@/helpers/utilities';

interface Props {
    value?: string;
    label?: string;
    hint?: string;
    enable_limit?: boolean;
    disable?: boolean;
    clear?: boolean;
    id?: number;
}

export default defineComponent({
    name: 'DatePickerComponent',
    props: {
        id: { type: Number },
        value: { type: String },
        label: { type: String },
        hint: { type: String },
        enable_limit: { type: Boolean },
        disable: {
            type: Boolean,
            default: false
        },
        clear: { type: Boolean }
    },
    emits: ['date_selected'],
    setup(props: Props, { emit }) {
        const data = reactive({
            date: (props.value) ? formatGenericDate(props.value) : getCurrentDate()
        });

        const $q = useQuasar();

        const selectDate = (date) => {
            if (date && !validateDate(date)) {
                $q.notify(warningNotify('Por favor ingrese un fecha válida'));
                return;
            }

            if (props.id) {
                emit('date_selected', { date: parseToUtcDateTime(date), id: props.id });
            } else {
                emit('date_selected', parseToUtcDateTime(date));
            }
        }

        watch([() => props.value, () => props.clear], (
            [newVal, newClear], [oldVal, oldClear]) => {
            if (newClear != oldClear) {
                data.date = getCurrentDate();
                return;
            }

            if (newVal != oldVal) {
                data.date = newVal ?? '';
            }
        });


        return {
            ...toRefs(data),
            selectDate
        }
    }
});
</script>