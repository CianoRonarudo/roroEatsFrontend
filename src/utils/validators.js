import { helpers, email, minLength, required } from "@vuelidate/validators";

export const authValidations = {
    email : {
        required : helpers.withMessage('Email est obligatoire', required),
        email : helpers.withMessage('Email non valide', email)
    },
    password : {
        required : helpers.withMessage('Mot de passe est obligatoire', required),
        minLength : helpers.withMessage('Minimum 6 caractères', minLength(6))
    },
    first_name : {
        required : helpers.withMessage('Prénom est obligatoire', required)
    },
    last_name : {
        required : helpers.withMessage('Nom est obligatoire', required)
    }
}