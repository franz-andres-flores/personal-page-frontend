<template>
    <q-layout>
        <div class="dashboard-view">
            <q-header elevated class="dashboard-view-header">
                <q-toolbar>
                    <div class="dashboard-view-toolbar-info">
                        <div class="date">
                            {{ getCurrentDateForDashboard() }}
                        </div>

                        <q-separator vertical inset class="q-mx-lg dashboard-view-separator" />

                        <div class="dashboard-view-account">
                            <div class="user">
                                {{ administrator.firstName }} {{ administrator.lastName }}
                            </div>
                            <div class="image">
                                <q-avatar size="42px">
                                    <q-img class="image" src="@/assets/images/admin/admin.jpg" />
                                </q-avatar>
                            </div>
                            <q-btn-dropdown flat class="dropdown-btn">
                                <q-list>
                                    <q-item class="dashboard-view__item" :to="profile_uri" clickable v-close-popup>
                                        <q-item-section>
                                            <q-item-label>Mi Perfil</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="dashboard-view__item" clickable v-close-popup @click="logout">
                                        <q-item-section>
                                            <q-item-label>Cerrar Sesión</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </div>
                    </div>
                </q-toolbar>
            </q-header>

            <q-drawer v-model="drawer" show-if-above :mini="miniState" bordered @mouseover="miniState = false"
                @mouseout="miniState = true" mini-to-overlay>
                <q-scroll-area class="fit">
                    <q-list v-for="menu in menus" class="menu-component" :key="menu.menu_id">
                        <q-item :active="link === menu.menu" active-class="menu-component-item-active" :to="menu.path"
                            clickable>
                            <q-item-section avatar>
                                <q-icon class="menu-component-icon" :name="menu.icon" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="menu-component-label">
                                    {{ menu.menu }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page class="row no-wrap">
                    <div class="col">
                        <div class="full-height">
                            <q-scroll-area class="col q-pr-sm full-height" style="background-color: #F5F6FA;" visible>
                                <router-view />
                            </q-scroll-area>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </div>
    </q-layout>
</template>

<script lang="ts">
import DashboardView from './DashboardView';
export default DashboardView;
</script>

<style lang="scss" src="./DashboardView.scss"></style>