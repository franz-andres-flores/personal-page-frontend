<template>
    <q-layout class="custom-layout">
        <div class="container">
            <div class="header">
                <h2 class="title">Usuarios</h2>
                <div class="btn-container">
                    <q-btn color="primary" label="Agregar" @click="showFormUser()" />
                    <q-btn color="primary" label="Exportar" @click="showExportModal()" />
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-11">
                    <div class="row">
                        <div class="col-12 col-md-4 q-mb-sm">
                            <filter-list-component labelSearcher="Buscar usuario"
                                labelTooltip="Buscar por nombres, apellidos" :active="active" :inactive="inactive"
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
                        :isRestoreEnable="true" :enableVisibleColumns="true" :isCourseEnable="true" @request="onRequest"
                        @edit="showFormUser" @confirm="showConfirmModal" @course="showUserCourseForm" />
                </div>
            </div>
        </div>
    </q-layout>

    <UserFormComponent v-if="toggleFormModal" v-model="toggleFormModal" :user="user"
        @update:toggleFormModal="closeFormUser" />

    <UserCourseFormComponent v-if="toggleUserCourseFormModal" v-model="toggleUserCourseFormModal" :idUser="idUser"
        @update:toggleFormModal="closeUserCourseForm" />

    <confirm-modal v-if="toggleConfirmModal" v-model="toggleConfirmModal" :message="message" :user="userRow"
        @update:toggleConfirmModal="closeConfirmModal" @update:result="updateActiveUser" />

    <export-modal v-if="toggleExportModal" v-model="toggleExportModal" :fields="fields" :data_export="dataExport"
        :option_data="option" :file_name="fileName" :service="service" @update:show_export_modal="closeExportModal"
        @update:size_option="exportUsers" />
</template>

<script lang="ts">
import UserListView from './UserListView';
export default UserListView;
</script>