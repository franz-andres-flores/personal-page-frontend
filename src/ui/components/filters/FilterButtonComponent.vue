<template>
    <div class="filter-button">
        <div class="row">
            <div class="col q-pa-sm center-btn">
                <q-btn round color="primary" icon="search" @click="search">
                    <q-tooltip>
                        Buscar registros
                    </q-tooltip>
                </q-btn>
            </div>
            <div v-if="enableOrderBtn" class="col q-pa-sm center-btn">
                <q-btn round color="primary" icon="list_alt">
                    <q-menu>
                        <q-list dense style="min-width: 100px">
                            <q-item v-for="(field, index) in fields" :key="index" clickable>
                                <q-item-section>{{ field.label }}</q-item-section>
                                <q-item-section side>
                                    <q-icon name="keyboard_arrow_right" />
                                </q-item-section>

                                <q-menu anchor="top end" self="top start">
                                    <q-list>
                                        <q-item dense clickable @click="onSortBy(field.name, false)">
                                            <q-item-section>
                                                Ascendente
                                            </q-item-section>
                                        </q-item>
                                        <q-item dense clickable @click="onSortBy(field.name, true)">
                                            <q-item-section>
                                                Descendente
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-item>
                        </q-list>
                    </q-menu>
                    <q-tooltip>
                        Ordenar registros
                    </q-tooltip>
                </q-btn>
            </div>
            <div class="col q-pa-sm center-btn">
                <q-btn round color="negative" icon="auto_delete" @click="reset">
                    <q-tooltip>
                        Limpiar filtros de búsqueda
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { QTableProps } from 'node_modules/quasar/dist/types/index';

interface Props {
    columns?: QTableProps['columns'],
    enableOrderBtn: boolean;
}

export default defineComponent({
    name: 'FilterButtonComponent',
    props: {
        columns: {
            type: Array as () => QTableProps['columns']
        },
        enableOrderBtn: {
            type: Boolean,
            default: true
        }
    },
    setup(props: Props, { emit }) {
        const config = reactive({
            fields: (props.columns) ? props.columns.filter(x => x.field != '') : []
        });

        const search = () => {
            emit('onSearch', true);
        }

        const reset = () => {
            emit('onReset', true);
        }

        const onSortBy = (column: string, isDescending: boolean) => {
            emit('onSortBy', column);
            emit('onDescendent', isDescending);
        }

        return {
            ...toRefs(config),
            search,
            reset,
            onSortBy
        }
    }
});
</script>

<style lang="scss">
.filter-button {
    .center-btn {
        display: flex;
        justify-content: center;
    }
}
</style>