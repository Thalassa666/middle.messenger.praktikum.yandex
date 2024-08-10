function validateInput(event: Event, pattern: RegExp, errorMessage: string) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();

    if (!pattern.test(value)) {
        showError(target, errorMessage);
    } else {
        clearError(target);
    }
}

export function firstNameValidation(event: Event) {
    validateInput(event, /^[А-ЯЁA-Z][а-яёa-z]*$/, 'Имя должно начинаться с заглавной буквы и содержать только буквы.');
}

export function secondNameValidation(event: Event) {
    validateInput(event, /^[А-ЯЁA-Z][а-яёa-z]*$/, 'Фамилия должна начинаться с заглавной буквы и содержать только буквы.');
}

export function loginValidation(event: Event) {
    validateInput(event, /^[a-zA-Z0-9_-]{3,20}$/, 'Логин должен содержать от 3 до 20 символов, только латинские буквы, цифры, дефис и/или подчеркивание.');
}

export function emailValidation(event: Event) {
    validateInput(event, /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, 'Email должен быть в формате "example@domain.com".');
}

export function passwordValidation(event: Event) {
    validateInput(event, /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/, 'Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру.');
}

export function phoneValidation(event: Event) {
    validateInput(event, /^\+?\d{10,15}$/, 'Телефон должен содержать от 10 до 15 цифр, возможно начиная с плюса.');
}

function showError(input: HTMLInputElement, message: string) {
    let errorElement = input.parentNode?.querySelector('.input-error-message') as HTMLElement;

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'input-error-message';
        input.parentNode?.appendChild(errorElement);
    }

    errorElement.innerText = message;
    input.classList.add('input-error');
}

function clearError(input: HTMLInputElement) {
    const errorElement = input.parentNode?.querySelector('.input-error-message') as HTMLElement;

    if (errorElement) {
        input.parentNode?.removeChild(errorElement);
    }

    input.classList.remove('input-error');
}
