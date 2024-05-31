import Block, { BlockProps } from '../../helpers/block';
import'./login.css';
import loginPageTemplate from './login.hbs?raw';
import Handlebars from 'handlebars';
import InputForm from '../../components/input';
import ButtonForm from '../../components/button';
import { getFormData } from "../../helpers/getFormData.ts";
import { loginValidation, passwordValidation } from "../../helpers/validation.ts";

interface LoginPageProps extends BlockProps {
    loginPlaceholder: string;
    passwordPlaceholder: string;
}

class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
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
            const signinButton = this.element.querySelector('button[data-page="signin"]');
            if (signinButton) {
                signinButton.addEventListener('click', this.handleSigninClick);
            }
        }, 0);
        return true;
    }

    handleBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.name === 'login') {
            loginValidation({ target });
        } else if (target.name === 'password') {
            passwordValidation({ target });
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
            window.location.hash = '#chat';
        }
    }

    handleSigninClick() {
        window.location.hash = '#signin';
    }

    render(): string {
        const inputLogin = new InputForm({
            type: 'text',
            name: 'login',
            placeholder: this.props.loginPlaceholder,
        });

        const inputPassword = new InputForm({
            type: 'password',
            name: 'password',
            placeholder: this.props.passwordPlaceholder,
        });

        const loginButton = new ButtonForm({
            class: 'primary-btn',
            type: 'submit',
            text: 'Войти',
            page: 'chat',
        });

        const signupButton = new ButtonForm({
            class: 'secondary-btn',
            type: 'button',
            text: 'Зарегистрироваться',
            page: 'signin',
        });

        const template = Handlebars.compile(loginPageTemplate);

        return template({
            InputLogin: inputLogin.render(),
            InputPassword: inputPassword.render(),
            LoginButton: loginButton.render(),
            SignupButton: signupButton.render(),
        });
    }
}

export default LoginPage;
