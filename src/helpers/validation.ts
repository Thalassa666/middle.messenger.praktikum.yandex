export function firstNameValidation(event: { target: HTMLInputElement }) {
    const firstNameValue = event.target.value.trim();
    const namePattern = /^[А-ЯЁA-Z][а-яёa-z]*$/;

    if (!namePattern.test(firstNameValue)) {
        showError(event.target, 'Имя должно начинаться с заглавной буквы, содержать только латинские или кириллические символы, дефис и не содержать цифры.');
    } else {
        clearError(event.target);
    }
}

export function secondNameValidation(event: { target: HTMLInputElement }) {
    const firstNameValue = event.target.value.trim();
    const namePattern = /^[А-ЯЁA-Z][а-яёa-z]*$/;

    if (!namePattern.test(firstNameValue)) {
        showError(event.target, 'Фамилия должна начинаться с заглавной буквы, содержать только латинские или кириллические символы, дефис и не содержать цифры.');
    } else {
        clearError(event.target);
    }
}

export function loginValidation(event: { target: HTMLInputElement }) {
    const loginValue = event.target.value.trim();
    const loginPattern = /^[a-zA-Z0-9_-]{3,20}$/;

    if (!loginPattern.test(loginValue)) {
        showError(event.target, 'Логин должен содержать от 3 до 20 символов латиницы, цифры, дефис и/или нижнее подчёркивание.');
    } else {
        clearError(event.target);
    }
}

export function emailValidation(event: { target: HTMLInputElement }) {
    const emailValue = event.target.value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
        showError(event.target, 'Email должен содержать латинские буквы, цифры, дефис, подчёркивание, символ "@" и точку после неё, перед которой должны быть буквы.');
    } else {
        clearError(event.target);
    }
}

export function passwordValidation(event: { target: HTMLInputElement }) {
    const passwordValue = event.target.value.trim();
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    if (!passwordPattern.test(passwordValue)) {
        showError(event.target, 'Пожалуйста, введите пароль от 8 до 40 символов, содержащий хотя бы одну заглавную букву и цифру.');
    } else {
        clearError(event.target);
    }
}

export function phoneValidation(event: { target: HTMLInputElement }) {
    const phoneValue = event.target.value.trim();
    const phonePattern = /^\+?\d{10,15}$/;

    if (!phonePattern.test(phoneValue)) {
        showError(event.target, 'Пожалуйста, введите номер телефона от 10 до 15 цифр, возможно начиная с плюса.');
    } else {
        clearError(event.target);
    }
}

export function messageValidation(event: { target: HTMLInputElement }) {
    const messageValue = event.target.value.trim();

    if (messageValue === '') {
        showError(event.target, 'Пожалуйста, введите сообщение.');
    } else {
        clearError(event.target);
    }
}

function showError(input: HTMLInputElement, message: string) {
    const errorElement = document.createElement('div');
    errorElement.className = 'input-error-message';
    errorElement.innerText = message;

    input.classList.add('input-error');
    if (input.nextSibling) {
        input.parentNode?.removeChild(input.nextSibling);
    }
    input.parentNode?.insertBefore(errorElement, input.nextSibling);
}

function clearError(input: HTMLInputElement) {
    input.classList.remove('input-error');
    const nextSibling = input.nextSibling as HTMLElement;
    if (nextSibling && nextSibling.className === 'input-error-message') {
        input.parentNode?.removeChild(nextSibling);
    }
}
