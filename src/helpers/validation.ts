export function firstNameValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const firstNameValue = target.value.trim();
    const namePattern = /^[А-ЯЁA-Z][а-яёa-z]*$/;

    if (!namePattern.test(firstNameValue)) {
        showError(target, 'Имя должно начинаться с заглавной буквы, содержать только латинские или кириллические символы, дефис и не содержать цифры.');
    } else {
        clearError(target);
    }
}

export function secondNameValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const firstNameValue = target.value.trim();
    const namePattern = /^[А-ЯЁA-Z][а-яёa-z]*$/;

    if (!namePattern.test(firstNameValue)) {
        showError(target, 'Фамилия должна начинаться с заглавной буквы, содержать только латинские или кириллические символы, дефис и не содержать цифры.');
    } else {
        clearError(target);
    }
}

export function loginValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const loginValue = target.value.trim();
    const loginPattern = /^[a-zA-Z0-9_-]{3,20}$/;

    if (!loginPattern.test(loginValue)) {
        showError(target, 'Логин должен содержать от 3 до 20 символов латиницы, цифры, дефис и/или нижнее подчёркивание.');
    } else {
        clearError(target);
    }
}

export function emailValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const emailValue = target.value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
        showError(target, 'Email должен содержать латинские буквы, цифры, дефис, подчёркивание, символ "@" и точку после неё, перед которой должны быть буквы.');
    } else {
        clearError(target);
    }
}

export function passwordValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const passwordValue = target.value.trim();
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    if (!passwordPattern.test(passwordValue)) {
        showError(target, 'Пожалуйста, введите пароль от 8 до 40 символов, содержащий хотя бы одну заглавную букву и цифру.');
    } else {
        clearError(target);
    }
}

export function phoneValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const phoneValue = target.value.trim();
    const phonePattern = /^\+?\d{10,15}$/;

    if (!phonePattern.test(phoneValue)) {
        showError(target, 'Пожалуйста, введите номер телефона от 10 до 15 цифр, возможно начиная с плюса.');
    } else {
        clearError(target);
    }
}

export function messageValidation(event: Event) {
    const target = event.target as HTMLInputElement;
    const messageValue = target.value.trim();

    if (messageValue === '') {
        showError(target, 'Пожалуйста, введите сообщение.');
    } else {
        clearError(target);
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
