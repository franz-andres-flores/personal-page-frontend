<template>
    <q-layout class="custom-layout">
        <div class="container">
            <div class="header">
                <h2 class="title">Proyectos</h2>
                <div class="btn-container">
                    <q-btn color="primary" label="Agregar" @click="showFormProject()" />
                    <q-btn color="primary" label="Exportar" @click="showExportModal()" />
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-11">
                    <div class="row">
                        <div class="col-12 col-md-4 q-mb-sm">
                            <filter-list-component labelSearcher="Buscar proyecto" labelTooltip="Buscar por nombre"
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
                        :isRestoreEnable="true" :enableVisibleColumns="true" @request="onRequest"
                        @edit="showFormProject" @confirm="showConfirmModal" />
                </div>
            </div>
        </div>
    </q-layout>

    <ProjectFormComponent v-if="toggleFormModal" v-model="toggleFormModal" :project="project"
        @update:toggleFormModal="closeFormProject" />

    <confirm-modal v-if="toggleConfirmModal" v-model="toggleConfirmModal" :message="message"
        @update:toggleConfirmModal="closeConfirmModal" @update:result="updateActiveProject" />

    <export-modal v-if="toggleExportModal" v-model="toggleExportModal" :fields="fields" :data_export="dataExport"
        :option_data="option" :file_name="fileName" :service="service" @update:show_export_modal="closeExportModal"
        @update:size_option="exportProjects" />

</template>


<script lang="ts">
import ProjectListView from './ProjectListView';
export default ProjectListView;
</script>