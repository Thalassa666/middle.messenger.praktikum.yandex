import './signin.css';
import '../../style.css';
import Block from '../../helpers/block';
import InputForm from '../../components/input';
import ButtonForm from '../../components/button';
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    passwordValidation, phoneValidation,
    secondNameValidation
} from '../../helpers/validation.ts';
import Router from '../../helpers/Router.ts';
import { connect, MapStateToProps } from '../../utils/connect.ts';
import { me, create } from '../../services/Auth.service.ts';
import { Routes } from '../../main.ts';
import { getModel } from '../../utils/model.ts';
import { CreateUser } from 'types/types.ts';
import handleSubmit from '../../helpers/submit.ts';

const router = Router;

type RegType = Record<string, InputForm | ButtonForm>

class SigninPage extends Block<RegType> {
    constructor(props = {}) {
        super({
            ...props,
            InputEmail: new InputForm({
                type: 'email',
                name: 'email',
                placeholder: 'почта',
                events: {
                    blur: [emailValidation]
                }
            }),

            InputLogin: new InputForm({
                type: 'text',
                name: 'login',
                placeholder: 'логин',
                events: {
                    blur: [loginValidation]
                }
            }),

            InputFirstName: new InputForm({
                type: 'text',
                name: 'first_name',
                placeholder: 'имя',
                events: {
                    blur: [firstNameValidation]
                }
            }),

            InputSecondName: new InputForm({
                type: 'text',
                name: 'second_name',
                placeholder: 'фамилия',
                events: {
                    blur: [secondNameValidation]
                }
            }),

            InputPhone: new InputForm({
                type: 'phone',
                name: 'phone',
                placeholder: 'телефон',
                events: {
                    blur: [phoneValidation]
                }
            }),

            InputPassword: new InputForm({
                type: 'password',
                name: 'password',
                placeholder: 'пароль',
                events: {
                    blur: [passwordValidation]
                }
            }),

            InputConfirmPassword: new InputForm({
                type: 'password',
                name: 'confirm_password',
                placeholder: 'пароль еще раз',
                events: {
                    blur: [passwordValidation]
                }
            }),

            SignupButton: new ButtonForm({
                className: 'primary-btn',
                type: 'submit',
                text: 'Зарегистрироваться',
                page: 'main',
                events: {
                    click:  [e => {
                        create(getModel(e) as CreateUser);
                        handleSubmit(e);
                        router.go(Routes.Chats);
                    }]
                }
            }),

            LoginButton: new ButtonForm({
                className: 'secondary-btn',
                type: 'button',
                text: 'Войти',
                page: 'login',
                events: {
                    click: [() => {
                        router.go('/')
                    }]
                }
            }),
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me()
            if (this.props.currentUser !== null) router.go(Routes.Chats)
        }
        getUserInfo()
    }

    render(): string {
        return `
        <section class="signin section">
            <div class="signin__container container">
                <h1 class="signin__title title">Регистрация</h1>
                <form class="signin__form form">
                    {{{InputEmail}}}
                    {{{InputLogin}}}
                    {{{InputFirstName}}}
                    {{{InputSecondName}}}
                    {{{InputPhone}}}
                    {{{InputPassword}}}
                    {{{InputConfirmPassword}}}
                    {{{SignupButton}}}
                    {{{LoginButton}}}
                </form>
            </div>
        </section>
        `
    }
}

const mapStateToProps: MapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps)(SigninPage);
