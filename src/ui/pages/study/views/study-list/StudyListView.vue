<template>
    <q-layout class="custom-layout">
        <div class="container">
            <div class="header">
                <h2 class="title">Estudios</h2>
                <div class="btn-container">
                    <q-btn color="primary" label="Agregar" @click="showFormStudy()" />
                    <q-btn color="primary" label="Exportar" @click="showExportModal()" />
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-11">
                    <div class="row">
                        <div class="col-12 col-md-4 q-mb-sm">
                            <filter-list-component labelSearcher="Buscar estudio"
                                labelTooltip="Buscar por institución, titulación" :active="active" :inactive="inactive"
                                :searcher="searcher" @update:searcher="onUpdateSearcher" @update:active="onUpdateActive"
                                @update:inactive="onUpdateInactive" @search="onSearch" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-1 center-btn-fillters">
                    <filter-button-component :enableOrderBtn="false" :columns="columnsOrder" @onSearch="onSearch"
                        @onReset="onReset" @onSortBy="onUpdateSortBy" @onDescendent="onUpdateDescending" />
                </div>
            </div>

            <div class="row q-pt-sm">
                <div class="col-12">
                    <table-component :loading="loading" :isEditEnable="true" :isDeleteEnable="true"
                        :isRestoreEnable="true" :enableVisibleColumns="true" @request="onRequest" @edit="showFormStudy"
                        @confirm="showConfirmModal" />
                </div>
            </div>
        </div>
    </q-layout>

    <StudyFormComponent v-if="toggleFormModal" v-model="toggleFormModal" :study="study"
        @update:toggleFormModal="closeFormStudy" />

    <confirm-modal v-if="toggleConfirmModal" v-model="toggleConfirmModal" :message="message"
        @update:toggleConfirmModal="closeConfirmModal" @update:result="updateActiveStudy" />

    <export-modal v-if="toggleExportModal" v-model="toggleExportModal" :fields="fields" :data_export="dataExport"
        :option_data="option" :file_name="fileName" :service="service" @update:show_export_modal="closeExportModal"
        @update:size_option="exportStudys" />

</template>

<script lang="ts">
import StudyListView from './StudyListView';
export default StudyListView;
</script>