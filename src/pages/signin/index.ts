import "./signin.css";
import "../../style.css";
import Block from "../../helpers/block";
import InputForm from "../../components/input";
import ButtonForm from "../../components/button";
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    passwordValidation,
    phoneValidation,
    secondNameValidation,
} from "../../helpers/validation";
import Router from "../../helpers/Router";
import { connect, MapStateToProps } from "../../utils/connect";
import { me, create } from "../../services/Auth.service";
import { Routes } from "../../main";
import { getModel } from "../../utils/model";
import { CreateUser } from "../../types/types";

const router = Router;

type RegType = Record<string, InputForm | ButtonForm>;

class SigninPage extends Block<RegType> {
    constructor(props = {}) {
        super({
            ...props,
            InputEmail: new InputForm({
                type: "email",
                name: "email",
                placeholder: "почта",
                events: {
                    blur: [emailValidation],
                },
            }),

            InputLogin: new InputForm({
                type: "text",
                name: "login",
                placeholder: "логин",
                events: {
                    blur: [loginValidation],
                },
            }),

            InputFirstName: new InputForm({
                type: "text",
                name: "first_name",
                placeholder: "имя",
                events: {
                    blur: [firstNameValidation],
                },
            }),

            InputSecondName: new InputForm({
                type: "text",
                name: "second_name",
                placeholder: "фамилия",
                events: {
                    blur: [secondNameValidation],
                },
            }),

            InputPhone: new InputForm({
                type: "phone",
                name: "phone",
                placeholder: "телефон",
                events: {
                    blur: [phoneValidation],
                },
            }),

            InputPassword: new InputForm({
                type: "password",
                name: "password",
                placeholder: "пароль",
                events: {
                    blur: [passwordValidation],
                },
            }),

            InputConfirmPassword: new InputForm({
                type: "password",
                name: "confirm_password",
                placeholder: "пароль еще раз",
                events: {
                    blur: [passwordValidation],
                },
            }),

            LoginButton: new ButtonForm({
                className: "secondary-btn",
                type: "button",
                text: "Войти",
                page: "login",
                events: {
                    click: [
                        () => {
                            router.go("/");
                        },
                    ],
                },
            }),
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me();
            if (this.props.currentUser !== null) router.go(Routes.Chats);
        };
        getUserInfo();

        const SignupButton = new ButtonForm({
            className: "primary-btn",
            type: "submit",
            text: "Зарегистрироваться",
            page: "main",
            events: {
                click: [this.handleReg],
            },
        });

        this.children = {
            ...this.children,
            SignupButton,
        };
    }

    handleReg(e: Event) {
        e.preventDefault();
        emailValidation;
        firstNameValidation;
        loginValidation;
        passwordValidation;
        phoneValidation;
        secondNameValidation;

        const form = (e.target as HTMLElement).closest("form");
        if (!form) return;

        const inputs = form.querySelectorAll("input");
        let isFormValid = true;

        inputs.forEach((input) => {
            const blurEvent = new FocusEvent("blur", { relatedTarget: input });
            input.dispatchEvent(blurEvent);

            if (input.classList.contains("input-error")) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            create(getModel(e) as CreateUser);
            router.go(Routes.Chats);
        }
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
        `;
    }
}

const mapStateToProps: MapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(SigninPage);
