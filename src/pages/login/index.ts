import Block from "../../helpers/block";
import "./login.css";
import InputForm from "../../components/input";
import ButtonForm from "../../components/button";
import { loginValidation, passwordValidation } from "../../helpers/validation";
import Router from "../../helpers/Router";
import { Routes } from "../../main";
import { MapStateToProps, connect } from "../../utils/connect";
import { me, login } from "../../services/Auth.service";
import { getModel } from "../../utils/model";
import { Login, UserResponse } from "../../types/types";

const router = Router;

interface LoginPageProps {
    currentUser: UserResponse | null;
}

class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
        super({
            ...props,
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me();
            if (this.props.currentUser !== null) router.go(Routes.Chats);
        };
        getUserInfo();

        const InputLogin = new InputForm({
            type: "text",
            name: "login",
            placeholder: "логин",
            events: {
                blur: [loginValidation],
            },
        });

        const InputPassword = new InputForm({
            type: "password",
            name: "password",
            placeholder: "пароль",
            events: {
                blur: [passwordValidation],
            },
        });

        const LoginButton = new ButtonForm({
            className: "primary-btn",
            type: "submit",
            text: "Войти",
            page: "messenger",
            events: {
                click: [this.handleLogin],
            },
        });

        const SignupButton = new ButtonForm({
            className: "secondary-btn",
            type: "button",
            text: "Зарегистрироваться",
            page: "signin",
            events: {
                click: [
                    () => {
                        router.go(Routes.Register);
                    },
                ],
            },
        });

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
            LoginButton,
            SignupButton,
        };
    }

    handleLogin(e: Event) {
        e.preventDefault();
        loginValidation;
        passwordValidation;

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
            login(getModel(e) as Login);
            router.go(Routes.Chats);
        } else {
            console.log("error validation");
        }
    }

    componentDidUpdate(
        oldProps: LoginPageProps,
        newProps: LoginPageProps,
    ): boolean {
        if (
            oldProps.currentUser !== newProps.currentUser &&
            newProps.currentUser !== null
        ) {
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
        `;
    }
}

const mapStateToProps: MapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(LoginPage);
