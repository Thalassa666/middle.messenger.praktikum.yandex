import './signin.css';
import '../../style.css';
import Block, { BlockProps } from '../../helpers/block';
import signinPageTemplate from './signin.hbs?raw';
import InputForm from '../../components/input';
import ButtonForm from '../../components/button';
import { getFormData } from "../../helpers/getFormData.ts";
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    passwordValidation, phoneValidation,
    secondNameValidation
} from "../../helpers/validation.ts";

interface SigninPageProps extends BlockProps {
    emailPlaceholder: string;
    loginPlaceholder: string;
    firstNamePlaceholder: string;
    secondNamePlaceholder: string;
    phonePlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
}

class SigninPage extends Block<SigninPageProps> {
    constructor(props: SigninPageProps) {
        super('div', {
            ...props,
            InputEmail: new InputForm({
                type: 'email',
                name: 'email',
                placeholder: props.emailPlaceholder,
                events: {
                    blur: emailValidation,
                }
            }),

            InputLogin: new InputForm({
                type: 'text',
                name: 'login',
                placeholder: props.loginPlaceholder,
                events: {
                    blur: loginValidation,
                }
            }),

            InputFirstName: new InputForm({
                type: 'text',
                name: 'first_name',
                placeholder: props.firstNamePlaceholder,
                events: {
                    blur: firstNameValidation,
                }
            }),

            InputSecondName: new InputForm({
                type: 'text',
                name: 'second_name',
                placeholder: props.secondNamePlaceholder,
                events: {
                    blur: secondNameValidation,
                }
            }),

            InputPhone: new InputForm({
                type: 'phone',
                name: 'phone',
                placeholder: props.phonePlaceholder,
                events: {
                    blur: phoneValidation,
                }
            }),

            InputPassword: new InputForm({
                type: 'password',
                name: 'password',
                placeholder: props.passwordPlaceholder,
                events: {
                    blur: passwordValidation,
                }
            }),

            InputConfirmPassword: new InputForm({
                type: 'password',
                name: 'confirm_password',
                placeholder: props.confirmPasswordPlaceholder,
                events: {
                    blur: passwordValidation,
                }
            }),

            SignupButton: new ButtonForm({
                className: 'primary-btn',
                type: 'submit',
                text: 'Зарегистрироваться',
                page: 'main',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.handleFormSubmit(event);
                    }
                }
            }),

            LoginButton: new ButtonForm({
                className: 'secondary-btn',
                type: 'button',
                text: 'Войти',
                page: 'login',
                events: {
                    click: () => {
                        window.location.hash = '#login'
                    }
                }
            }),
        });
    }

    handleFormSubmit(event: Event) {
        const form = (event.target as HTMLElement).closest('form');
        if (!form) return;

        const inputs = form.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach(input => {
            const blurEvent = new FocusEvent('blur', { relatedTarget: input });
            input.dispatchEvent(blurEvent);

            if (input.classList.contains('input-error')) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            console.log(getFormData(event));
            window.location.hash = '#main';
        }
    }
    render(): DocumentFragment {
        return this.compile(signinPageTemplate, this.props);
    }
}

export default SigninPage;
