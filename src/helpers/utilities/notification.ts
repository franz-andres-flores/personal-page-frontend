import { QLoadingShowOptions } from "node_modules/quasar/dist/types/index";

// Mensaje de éxito al realizar una acción
export const successNotify = (message: string) => {
    return {
        color: 'green-13',
        textColor: 'white',
        icon: 'check_circle',
        progress: true,
        classes: 'glossy',
        message: message
    }
}

// Mensaje de error al realizar una acción
export const errorNotify = (message: string) => {
    return {
        color: 'red-5',
        textColor: 'white',
        icon: 'highlight_off',
        progress: true,
        classes: 'glossy',
        message: message
    }
}

// Mensaje de advertencia al realizar una acción
export const warningNotify = (message: string) => {
    return {
        color: 'yellow-5',
        textColor: 'black',
        icon: 'warning',
        progress: true,
        classes: 'glossy',
        message: message
    }
}

export const messageLoading = (message: string): QLoadingShowOptions => {
    return {
        message: message,
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
    }
}