<template>
    <div class="table-component">
        <q-table ref="tableRef" :rows="rows ?? dataTable.rows" :columns="columnsTable" :no-data-label="messageNotData"
            v-model:pagination="dataTable.pagination" :rows-per-page-label="messageRowsPerPage" @request="emitOnRequest"
            :loading="loading" :rows-per-page-options="optionsPagination" :visible-columns="visibles"
            :class="getTableStyle()" :selection="selection" v-model:selected.sync="items"
            @update:selected="emitSelectedItems" :row-key="rowKey" :virtual-scroll="enableVirtualScroll"
            :title="titleTable" dense @row-click="($event, row) => onClickCell(row, $event.target)">
            <template v-if="enableVisibleColumns" v-slot:top-right>
                <q-select v-model="visibles" multiple filled dense options-dense :display-value="$q.lang.table.columns"
                    emit-value map-options :options="columnsTable" option-value="name" options-cover
                    style="min-width: 150px" />
            </template>

            <template v-slot:body-cell-description="props">
                <q-td :props="props" class="table-component-description">
                    {{ props.row.description }}
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <div>
                        <q-btn class="table-component-edit-btn" v-if="isEditEnable" dense round flat icon="edit"
                            @click="emitEditBtn(props.row)">
                            <q-tooltip>Editar registro</q-tooltip>
                        </q-btn>
                        <q-btn color="primary" v-if="isBlocksEnable" dense round flat icon="grid_view"
                            @click="emitBlockBtn(props.row)">
                            <q-tooltip>Gestionar Bloques de publicación</q-tooltip>
                        </q-btn>
                        <q-btn class="table-component-publication-btn" v-if="isPublicationEnable" dense round flat
                            icon="file_open" @click="emitPublicationBtn(props.row)">
                            <q-tooltip>Ver publicación</q-tooltip>
                        </q-btn>
                        <q-btn class="table-component-publication-btn" v-if="isCourseEnable" dense round flat
                            icon="history_edu" @click="emitCourseBtn(props.row)">
                            <q-tooltip>Asignar Cursos</q-tooltip>
                        </q-btn>
                        <q-btn class="table-component-publication-btn" v-if="isUserCoursePublicationEnable" dense round
                            flat icon="manage_accounts" @click="emitUserCoursePublicationBtn(props.row)">
                            <q-tooltip>Configurar Accesos del Curso</q-tooltip>
                        </q-btn>
                        <q-btn class="table-component-view-publications" v-if="isViewPublicationEnable" dense round flat
                            icon="library_books" @click="emitViewPublicationEnable(props.row)">
                            <q-tooltip>Ver publicaciones</q-tooltip>
                        </q-btn>

                        <q-btn v-if="(isDeleteEnable && props.row.isActive) || (isRestoreEnable && !props.row.isActive)"
                            :class="props.row.isActive ? 'table-component-erase-btn' : 'table-component-restore'" dense
                            round flat :icon="props.row.isActive ? 'delete' : 'check_circle'"
                            @click="emitIsActive(props.row)">
                            <q-tooltip v-if="props.row.isActive == 1">
                                Desactivar registro
                            </q-tooltip>
                            <q-tooltip v-else>
                                Activar registro
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-td>
            </template>

            <template v-slot:body-cell-active="props">
                <q-td :props="props">
                    <span :class="props.row.isActive ? 'table-component-active' : 'table-component-inactive'">
                        {{ props.row.active }}
                    </span>
                </q-td>
            </template>

            <template v-slot:body-cell-date="props">
                <q-td :props="props">
                    <DatePickerComponent :label="'Fecha'" :value="props.row.dateToPresent" @date_selected="onSelectDate"
                        :id="props.row.id" />
                </q-td>
            </template>

            <template v-slot:body-cell-isCompleted="props">
                <q-td :props="props">
                    <span
                        :class="props.row.isCompleted == 'Completo' ? 'table-component-true-state' : 'table-component-false-state'">
                        {{ props.row.isCompleted }}
                    </span>
                </q-td>
            </template>


            <template v-if="enableDragAndDrop" v-slot:body="props">
                <q-tr draggable="true" @dragstart="dragStart($event, props.row)" @dragover.prevent
                    @drop="dragDrop($event, props.row)" @click="emitRow(props.row)">
                    <q-td v-for="(col, index) in props.cols" :key="index" :style="`text-align: ${col.align}`">
                        {{ props.row[col.field] }}

                        <span v-if="col.name == 'active'"
                            :style="(props.row.isActive ? 'color:#21BA45' : 'color:#C10015')">
                            {{ props.row.active }}
                        </span>

                        <div v-if="col.name == 'actions'">
                            <q-btn class="table-component-edit-btn" v-if="isEditEnable" dense round flat icon="edit"
                                @click="emitEditBtn(props.row)">
                                <q-tooltip>Editar registro</q-tooltip>
                            </q-btn>
                            <q-btn
                                v-if="(isDeleteEnable && props.row.isActive) || (isRestoreEnable && !props.row.isActive)"
                                :class="props.row.isActive ? 'table-component-erase-btn' : 'table-component-restore'"
                                dense round flat :icon="props.row.isActive ? 'delete' : 'check_circle'"
                                @click="emitIsActive(props.row)">
                                <q-tooltip v-if="props.row.isActive == 1">
                                    Desactivar registro
                                </q-tooltip>
                                <q-tooltip v-else>
                                    Activar registro
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </q-td>
                </q-tr>
            </template>

        </q-table>
    </div>
</template>

<script lang="ts">
import TableComponent from './TableComponent';
export default TableComponent;
</script>

<style lang="scss" src="./TableComponent.scss"></style>