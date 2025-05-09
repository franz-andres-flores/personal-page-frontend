import { defineComponent, reactive, ref, toRefs } from "vue";
import { useQuasar } from "quasar";

import { errorNotify } from "@/helpers/utilities";
import router from "@/router";
import authService from "@/services/auth.service";


export default defineComponent({
    name: 'LoginView',
    setup() {

        const formSignin = reactive({
            email: '',
            password: '',
        });

        const formSigninAux = reactive({
            passwordaux: ''
        })

        const isPwd = ref(true)
        const $q = useQuasar()

        const onSubmit = async () => {
            try {
                const response = await authService.signIn(formSignin);   
                if (response.token) {
                    localStorage.setItem('user', JSON.stringify(response));
                    return router.replace({ name: "main" });
                }

            } catch (err: any) {
                if (err.response?.data?.statusCode == 500) {
                    $q.notify(errorNotify('Existe un error al iniciar sesión. Intente nuevamente'));
                    return;
                }
                
                const message = (err?.response) ? err?.response?.data?.message :
                    'No se pudo iniciar sesión. Por favor intente nuevamente';
                $q.notify(errorNotify(message));
            }
        }

        return {
            ...toRefs(formSignin),
            ...toRefs(formSigninAux),
            isPwd,
            onSubmit
        }
    }
})