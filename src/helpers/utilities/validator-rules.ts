export const validationRules = {
    requiredField: [
        (val) => (val && val.length > 0) || 'El campo es requerido',
    ],
    textFieldRequired: [
        (val) => (val && val.length > 0) || 'El campo es requerido',
        (val) => (val && val.length >= 3) || 'El campo debe tener al menos 3 caracteres',
    ],
}