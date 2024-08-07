import Block from '../../helpers/block';
import './login.css';
import InputForm from '../../components/input';
import ButtonForm from '../../components/button';
import { loginValidation, passwordValidation } from '../../helpers/validation.ts';
import handleSubmit from '../../helpers/submit.ts';
import Router from '../../helpers/Router.ts';
import { Routes } from '../../main.ts';
import { MapStateToProps, connect } from '../../utils/connect.ts';
import { me, login } from '../../services/Auth.service.ts';
import { getModel } from '../../utils/model.ts';
import { Login } from 'types/types.ts';

const router = Router;

class LoginPage extends Block {
    constructor(props = {}) {
        super({
            ...props,
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me()
            if (this.props.currentUser !== null) router.go(Routes.Chats)
        }
        getUserInfo();

        const InputLogin = new InputForm({
            type: 'text',
            name: 'login',
            placeholder: 'логин',
            events: {
                blur: [loginValidation]
            }
        });

        const InputPassword = new InputForm({
            type: 'password',
            name: 'password',
            placeholder: 'пароль',
            events: {
                blur: [passwordValidation]
            }
        })

        const LoginButton = new ButtonForm({
            className: 'primary-btn',
            type: 'submit',
            text: 'Войти',
            page: 'messenger',
            events: {
                click: [ e => {
                    login(getModel(e) as Login);
                    handleSubmit(e);
                    router.go(Routes.Chats);
                }]
            },
        })

        const SignupButton = new ButtonForm({
            className: 'secondary-btn',
            type: 'button',
            text: 'Зарегистрироваться',
            page: 'signin',
            events: {
                click: [() => {
                    router.go(Routes.Register)
                }]
            }
        })

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
            LoginButton,
            SignupButton
        }
    }

    componentDidUpdate(oldProps: { [x: string]: any }, newProps: { [x: string]: any }): boolean {
        if (oldProps.currentUser !== newProps.currentUser && newProps.currentUser !== null) {
            router.go(Routes.Chats);
        }
        return true;
    }

    render(): string {
        return `
        <section class="section login">
            <div class="container login__container">
                <h1 class="login__title">Вход</h1>
                <form class="login__form">
                    {{{ InputLogin }}}
                    {{{ InputPassword }}}
                    {{{ LoginButton }}}
                    {{{ SignupButton }}}
                </form>
            </div>
        </section>
        `
    }
}

const mapStateToProps: MapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps)(LoginPage);
