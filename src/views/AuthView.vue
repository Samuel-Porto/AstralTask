<script setup>
import { reactive, ref, watch } from 'vue';
import { registerAccount, signInAccount } from '@/store/tools/auth.js';
import authErrors from '@/store/messages/firebaseAuthErrors.json';

const currentTab = ref('login');

const user = reactive({
    register: {
        email: '',
        password: ''
    },
    login: {
        email: '',
        password: ''
    }
});
const errors = reactive({
    email: '',
    password: '',
    firebase: ''
});
const errorsMessage = {
    email: {
        valueMissing: 'Please, add an email',
        typeMismatch: 'Please, add a valid email',
        patternMismatch: 'Please, add a valid email'
    },
    password: {
        valueMissing: 'Please, add a password',
        tooShort: 'Please, your password must be at least 8 characters long',
        tooLong: 'Please, your password must be at max 16 characters long',
        
    }
}

function checkValidity(field) {
    const fieldName = field.name;
    let error;
    for(let validity in field.validity) {
        if(field.validity[validity]) error = validity;
    }

    errors[fieldName] = error === 'valid'? '': errorsMessage[fieldName][error];
}
async function handleRegisterAccount(e) {
    e.preventDefault();

    let email = user.register.email;
    let password = user.register.password;

    const error = await registerAccount(email, password);

    errors.firebase = authErrors[error];
}
async function handleSignInAccount(e) {
    e.preventDefault();

    let email = user.login.email;
    let password = user.login.password;

    const error = await signInAccount(email, password);

    errors.firebase = authErrors[error];
}

watch(currentTab, () => {
    errors.email = '';
    errors.password = '';
    errors.firebase = '';
});
</script>

<template>
    <div class="auth-container">
        <div class="main-container">
            <form class="form-field" @submit="e => handleRegisterAccount(e)" :style="{display: currentTab === 'register'? 'inline-block': 'none'}">
                <h3>Crie sua conta</h3>
                <label>
                    <p>Email:</p>
                    <input v-model="user.register.email" :class="{'field-error': errors.email}" type="email" name="email" @focusout="e => checkValidity(e.target)" pattern="\w+@\w+\.\w+" required>
                    <span class="error-field">{{ errors.email }}</span>
                </label>
                <label>
                    <p>Senha:</p>
                    <input v-model="user.register.password" :class="{'field-error': errors.password}" type="password" name="password" @focusout="e => checkValidity(e.target)" minlength="8" required>
                    <span class="error-field">{{ errors.password }}</span>
                </label>
                <span class="error-field">{{ errors.firebase }}</span>
                <button type="submit">Criar conta</button>
                <span>Já tem uma conta? Clique <span @click="currentTab = 'login'">aqui</span></span>
            </form>
            <form class="form-field" @submit="e => handleSignInAccount(e)" :style="{display: currentTab === 'login'? 'inline-block': 'none'}">
                <h3>Entre na sua conta</h3>
                <label>
                    <p>Email:</p>
                    <input v-model="user.login.email" type="email" name="email" required>
                </label>
                <label>
                    <p>Senha:</p>
                    <input v-model="user.login.password" type="password" name="password" required>
                </label>
                <span class="error-field">{{ errors.firebase }}</span>
                <button type="submit">Entrar</button>
                <span>Não tem uma conta? Clique <span @click="currentTab = 'register'">aqui</span></span>
            </form>
        </div>
    </div>
</template>
<style scoped>
.auth-container {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
}
.main-container {
    align-items: center;
    background: var(--background-highlighted-light);
    display: flex;
    height: 100%;
    justify-content: center;
    max-width: 768px;
    padding: 16px;
    width: 100%;
}
.form-field {
    max-width: 512px;
    width: 100%;
}
.form-field > h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 16px 0;
    text-align: center;
}
.form-field > label {
    display: inline-block;
    margin: 8px 0;
    min-height: 82px;
    width: 100%;
}
.field-error {
    background: color-mix(in srgb, var(--color-error), var(--background-highlighted-dark));
}
.form-field > label > input {
    border-radius: 8px;
    border: none;
    box-sizing: border-box;
    color: var(--font-color-primary);
    font-size: 16px;
    font-weight: 600;
    margin: 8px 0;
    min-width: 0;
    outline: none;
    padding: 4px 8px;
}
.form-field > label > input:not(.field-error) {
    background: var(--background-highlighted-dark);
}
.error-field {
    color: var(--color-error);
    display: inline-block;
    font-size: 14px;
    height: 14px;
    min-width: 4px;
}
.form-field > button {
    background: var(--color-theme);
    border-radius: 8px;
    border: 2px solid var(--color-theme);
    color: var(--background-highlighted-light);
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    padding: 4px;
    transition: .2s all;
    width: 100%;
}
.form-field > button:hover {
    background: transparent;
    color: var(--color-theme);
    transform: translateY(-4px);
}
.form-field > span {
    display: inline-block;
    padding: 8px 0;
}
.form-field > span > span {
    color: var(--color-theme);
    cursor: pointer;
}
@media screen and (min-width: 768px) {
    .main-container {
        border-radius: 16px;
        height: auto;
        width: auto;
    }
}
</style>