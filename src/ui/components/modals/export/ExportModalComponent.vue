<template>
    <q-dialog v-model="toggleExportDialog" persistent>
        <q-card class="export-modal-component">
            <q-card-section>
                <div class="text-h6">
                    <div class="header-form">
                        <div>Exportar información</div>
                        <q-btn color="negative" icon="close" v-close-popup>
                            <q-tooltip>Cerrar ventana</q-tooltip>
                        </q-btn>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <div class="row center-items">
                    <div class="col-12 col-md-6 q-pa-sm">
                        <q-select filled v-model="size" :options="sizeOptions" label="Tamaño de Datos"
                            @update:model-value="selectSizeOption" :dense="true" />
                    </div>
                </div>

                <div class="row center-items">
                    <div class="col-12 col-md6 q-pa-sm export-modal-component-dropdown">
                        <q-btn-dropdown color="primary" label="formato" flat text-color="primary" :disable-main-btn="enableDropdown" >
                            <q-list>
                                <q-item tag="label" v-ripple>
                                    <q-item-section>
                                        <q-item-label class="export-modal-component-export-btn">
                                            <export-excel-csv :data="data_export" :fields="fieldsToExportExcel"
                                                :name="fileName + '.xls'" type="xlsx">
                                                Excel (.xlsx)
                                            </export-excel-csv>
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item tag="label" v-ripple>
                                    <q-item-section>
                                        <q-item-label class="export-modal-component-export-btn">
                                            <export-excel-csv :data="data_export" :fields="fieldsToExportExcel"
                                                :name="fileName + '.xls'" type="csv">
                                                Excel (.csv)
                                            </export-excel-csv>
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item tag="label" v-ripple>
                                    <q-item-section @click="exportPdfFile">
                                        <q-item-label class="export-modal-component-export-btn">
                                            Archivo PDF
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="center">
                <q-btn label="Cancelar" color="negative" @click="cancelOption" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>


<script lang="ts">
import ExportModalComponent from './ExportModalComponent';
export default ExportModalComponent;
</script>

<style lang="scss" src="./ExportModalComponent.scss"></style>
