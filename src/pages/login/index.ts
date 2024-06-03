import Block, { BlockProps } from '../../helpers/block';
import './login.css';
import loginPageTemplate from './login.hbs?raw';
import InputForm from '../../components/input';
import ButtonForm from '../../components/button';
import { loginValidation, passwordValidation } from "../../helpers/validation.ts";
import handleSubmit from "../../helpers/submit.ts";

interface LoginPageProps extends BlockProps {
    loginPlaceholder: string;
    passwordPlaceholder: string;
}

class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
        super('div', {
            ...props,
            InputLogin: new InputForm({
                type: 'text',
                name: 'login',
                placeholder: 'логин',
                events: {
                    blur: loginValidation
                }
            }),
            InputPassword: new InputForm({
                type: 'password',
                name: 'password',
                placeholder: 'пароль',
                events: {
                    blur: passwordValidation
                }
            }),
            LoginButton: new ButtonForm({
                className: 'primary-btn',
                type: 'submit',
                text: 'Войти',
                page: 'chat',
                events: {
                    click: (event: Event) => handleSubmit(event)
                },
            }),
            SignupButton: new ButtonForm({
                className: 'secondary-btn',
                type: 'button',
                text: 'Зарегистрироваться',
                page: 'signin',
                events: {
                    click: () => {
                        window.location.hash = '#signin';
                    }
                }
            }),
        });
    }

    render(): DocumentFragment {
        return this.compile(loginPageTemplate, this.props);
    }
}

export default LoginPage;
