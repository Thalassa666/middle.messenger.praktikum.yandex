import './signin.css';
import '../../style.css';
import Block, { BlockProps } from '../../helpers/block';
import signinPageTemplate from './signin.hbs?raw';
import Handlebars from 'handlebars';
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
        super('div', props);
    }

    componentDidMount(): boolean {
        setTimeout(() => {
            const form = this.element.querySelector('form');
            if (form) {
                form.addEventListener('submit', this.handleSubmit.bind(this));
                form.querySelectorAll('input').forEach(input => {
                    input.addEventListener('blur', this.handleBlur.bind(this));
                });
            }
            const loginButton = this.element.querySelector('button[data-page="login"]');
            if (loginButton) {
                loginButton.addEventListener('click', this.handleLoginClick);
            }
        }, 0);
        return true;
    }

    handleBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        switch (target.name) {
            case 'email':
                emailValidation({ target });
                break;
            case 'login':
                loginValidation({ target });
                break;
            case 'first_name':
                firstNameValidation({ target });
                break;
            case 'second_name':
                secondNameValidation({ target });
                break;
            case 'phone':
                phoneValidation({ target });
                break;
            case 'password':
            case 'confirm_password':
                passwordValidation({ target });
                break;
            default:
                break;
        }
    }

    handleSubmit(event: Event) {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        if (!target) return;

        const formData = getFormData(event);

        target.querySelectorAll('input').forEach(input => {
            this.handleBlur({ target: input } as unknown as Event);
        });

        const isFormValid = Array.from(target.querySelectorAll('input')).every(input => !input.classList.contains('input-error'));

        if (isFormValid) {
            console.log('FormData:', formData);
            window.location.hash = '#main';
        }
    }

    handleLoginClick() {
        window.location.hash = '#login';
    }

    render(): string {
        const inputEmail = new InputForm({
            type: 'email',
            name: 'email',
            placeholder: this.props.emailPlaceholder,
        });

        const inputLogin = new InputForm({
            type: 'text',
            name: 'login',
            placeholder: this.props.loginPlaceholder,
        });

        const inputFirstName = new InputForm({
            type: 'text',
            name: 'first_name',
            placeholder: this.props.firstNamePlaceholder,
        });

        const inputSecondName = new InputForm({
            type: 'text',
            name: 'second_name',
            placeholder: this.props.secondNamePlaceholder,
        });

        const inputPhone = new InputForm({
            type: 'phone',
            name: 'phone',
            placeholder: this.props.phonePlaceholder,
        });

        const inputPassword = new InputForm({
            type: 'password',
            name: 'password',
            placeholder: this.props.passwordPlaceholder,
        });

        const inputConfirmPassword = new InputForm({
            type: 'password',
            name: 'confirm_password',
            placeholder: this.props.confirmPasswordPlaceholder,
        });

        const signupButton = new ButtonForm({
            class: 'primary-btn',
            type: 'submit',
            text: 'Зарегистрироваться',
            page: 'main',
        });

        const loginButton = new ButtonForm({
            class: 'secondary-btn',
            type: 'button',
            text: 'Войти',
            page: 'login',
        });

        const template = Handlebars.compile(signinPageTemplate);

        return template({
            InputEmail: inputEmail.render(),
            InputLogin: inputLogin.render(),
            InputFirstName: inputFirstName.render(),
            InputSecondName: inputSecondName.render(),
            InputPhone: inputPhone.render(),
            InputPassword: inputPassword.render(),
            InputConfirmPassword: inputConfirmPassword.render(),
            SignupButton: signupButton.render(),
            LoginButton: loginButton.render(),
        });
    }
}

export default SigninPage;
