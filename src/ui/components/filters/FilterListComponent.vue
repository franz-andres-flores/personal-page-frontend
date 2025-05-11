<template>
    <div class="searcher">
        <q-form v-if="isVisibleSearch" @submit="searchEmit" class="searcher-form">
            <q-input outlined bottom-slots v-model="searcherComputed" :label="labelSearcher" :dense="true">
                <q-tooltip>
                    {{ labelTooltip }}
                </q-tooltip>
                <template v-slot:append>
                    <q-icon v-if="searcher !== ''" name="close" @click="resetSearcher" class="cursor-pointer" />
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-form>

        <div v-if="isVisibleDropdown" class="dropdown-container">
            <q-btn-dropdown color="primary" label="Activo / Inactivo">
                <q-list>
                    <q-item tag="label" v-ripple>
                        <q-item-section side top>
                            <q-checkbox v-model="activeComputed" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Activos</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item tag="label" v-ripple>
                        <q-item-section side top>
                            <q-checkbox v-model="inactiveComputed" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Inactivos</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

interface Props {
    active?: boolean;
    inactive?: boolean;
    searcher?: string;
    labelSearcher?: string;
    labelTooltip?: string;
    isVisibleSearch: boolean;
    isVisibleDropdown?: boolean;
}

export default defineComponent({
    name: 'FilterListComponent',
    props: {
        active: { type: Boolean },
        inactive: { type: Boolean },
        searcher: { type: String },
        labelSearcher: {
            type: String,
            default: 'Buscar registros'
        },
        labelTooltip: {
            type: String,
            default: 'Buscar registros'
        },
        isVisibleSearch: {
            type: Boolean,
            default: true
        },
        isVisibleDropdown: {
            type: Boolean,
            default: true
        }
    },
    setup(props: Props, { emit }) {
        const activeComputed = computed({
            get() { return props.active },
            set(newValue) { emit('update:active', newValue) }
        });

        const inactiveComputed = computed({
            get() { return props.inactive },
            set(newValue) { emit('update:inactive', newValue) }
        });

        const searcherComputed = computed({
            get() { return props.searcher },
            set(newValue) { emit('update:searcher', newValue) }
        });

        const onActiveEmit = (active: boolean) => {
            emit('update:active', active);
        }

        const onInactiveEmit = (inactive: boolean) => {
            emit('update:inactive', inactive);
        }

        const resetSearcher = () => {
            emit('update:searcher', '');
        }

        const searchEmit = () => {
            emit('search');
        }

        return {
            activeComputed,
            inactiveComputed,
            searcherComputed,
            onActiveEmit,
            onInactiveEmit,
            resetSearcher,
            searchEmit
        }
    }
});
</script>

<style lang="scss">
.searcher {
    @media (max-width: 767.98px) {
       justify-content: center;
    }

    .q-field--with-bottom {
        padding-bottom: 0px !important;
    }
}

.searcher-form {
    margin-right: 10px;
}
</style>