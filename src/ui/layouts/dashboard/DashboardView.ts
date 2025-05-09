import { defineComponent, onMounted, reactive, toRefs } from "vue";

import router from "@/router";
import { MenuDto } from "@/dto";
import { getAdministratorFromLocalStorage, getCurrentDateForDashboard } from "@/helpers/utilities";

export default defineComponent({
    name: 'DashboardView',
    setup() {

        const menus = [
            { menu_id: 1, menu: 'Inicio', icon: 'home', path: '/main' },
            { menu_id: 2, menu: 'Usuarios', icon: 'person', path: '/user' },
            { menu_id: 3, menu: 'Empleos', icon: 'work', path: '/job' },
            { menu_id: 4, menu: 'Estudios', icon: 'school', path: '/study' },
            { menu_id: 5, menu: 'Cursos', icon: 'library_books', path: '/course' },
            { menu_id: 6, menu: 'Proyectos', icon: 'view_timeline', path: '/project' },
            { menu_id: 7, menu: 'Blogs', icon: 'newsmode', path: '/blog' },
        ];

        const config = reactive({
            admin: getAdministratorFromLocalStorage(),
            leftDrawerOpen: false,
            miniState: true,
            drawer: false,
            administrator: getAdministratorFromLocalStorage(),
            menus: [] as MenuDto[],
            profile_uri: `/profile/${getAdministratorFromLocalStorage().id}`
        });

        const data = reactive({
            services: [] as any[],
            link: '',
        });

        const informativeModal = reactive({
            toggleInformativeModal: false,
            message: '',
            type: ''
        });

        const fetchMenuUser = () => {
            config.menus = menus;
        }

        const drawerClick = (e) => {
            if (config.miniState) {
                config.miniState = false;
                e.stopPropagation();
            }
        }

        const logout = () => {
            localStorage.removeItem('user');
            router.replace({ name: "login" });
        }

        onMounted(() => {
            fetchMenuUser();
        });

        return {
            ...toRefs(config),
            ...toRefs(data),
            ...toRefs(informativeModal),
            drawerClick,
            logout,
            getCurrentDateForDashboard
        }
    }
});