<template>
    <q-layout class="custom-layout">
        <div class="container">
            <div class="header">
                <h2 class="title">Empleos</h2>
                <div class="btn-container">
                    <q-btn color="primary" label="Agregar" @click="showFormJob()" />
                    <q-btn color="primary" label="Exportar" @click="showExportModal()" />
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-11">
                    <div class="row">
                        <div class="col-12 col-md-4 q-mb-sm">
                            <filter-list-component labelSearcher="Buscar empleo" labelTooltip="Buscar por empresa"
                                :active="active" :inactive="inactive" :searcher="searcher"
                                @update:searcher="onUpdateSearcher" @update:active="onUpdateActive"
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
                        :isRestoreEnable="true" :enableVisibleColumns="true" @request="onRequest" @edit="showFormJob"
                        @confirm="showConfirmModal" />
                </div>
            </div>
        </div>
    </q-layout>

    <JobFormComponent v-if="toggleFormModal" v-model="toggleFormModal" :job="job"
        @update:toggleFormModal="closeFormJob" />

    <confirm-modal v-if="toggleConfirmModal" v-model="toggleConfirmModal" :message="message"
        @update:toggleConfirmModal="closeConfirmModal" @update:result="updateActiveJob" />

    <export-modal v-if="toggleExportModal" v-model="toggleExportModal" :fields="fields" :data_export="dataExport"
        :option_data="option" :file_name="fileName" :service="service" @update:show_export_modal="closeExportModal"
        @update:size_option="exportJobs" />

</template>


<script lang="ts">
import JobListView from './JobListView';
export default JobListView;
</script>