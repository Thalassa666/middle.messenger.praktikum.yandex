import Block from "../../helpers/block";
import "../profile/profile.css";
import "../../style.css";
import Avatar from "../../components/avatar";
import ProfileInput from "../../components/profileInput";
import ButtonForm from "../../components/button";
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    passwordValidation,
    phoneValidation,
    secondNameValidation,
} from "../../helpers/validation";
import { connect, MapStateToProps } from "../../utils/connect";
import { me } from "../../services/Auth.service";
import { UserResponse, UserUpdateRequest } from "../../types/types";
import { changeAvatar, changeUserData } from "../../services/Users.service";
import { getModel } from "../../utils/model";
import { BASE_URL } from "../../constants/constants";
import Router from "../../helpers/Router";
import { Routes } from "../../main";

const router = Router;

interface ProfileChangeProps {
    currentUser: UserResponse | null;
}

class ProfileChange extends Block<ProfileChangeProps> {
    constructor(props: ProfileChangeProps) {
        super({
            ...props,
            Avatar: new Avatar({
                title: props.currentUser?.display_name || "",
                avatar: props.currentUser?.avatar
                    ? `${BASE_URL}/resources${props.currentUser.avatar}`
                    : "/images/avatar.png",
                name: "Avatar",
                changeAvatar: true,
                events: {
                    change: [(e: Event) => this.handleAvatarChange(e)],
                },
            }),
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me();
        };
        getUserInfo();

        const EmailInput = new ProfileInput({
            label: "почта",
            profileInputValue: this.props.currentUser?.email || "",
            isReadOnly: false,
            name: "email",
            profileInputType: "email",
            events: {
                blur: [emailValidation],
            },
        });

        const LoginInput = new ProfileInput({
            label: "логин",
            profileInputValue: this.props.currentUser?.login || "",
            isReadOnly: false,
            name: "login",
            profileInputType: "text",
            events: {
                blur: [loginValidation],
            },
        });

        const FirstNameInput = new ProfileInput({
            label: "имя",
            profileInputValue: this.props.currentUser?.first_name || "",
            isReadOnly: false,
            name: "first_name",
            profileInputType: "text",
            events: {
                blur: [firstNameValidation],
            },
        });

        const SecondNameInput = new ProfileInput({
            label: "фамилия",
            profileInputValue: this.props.currentUser?.second_name || "",
            isReadOnly: false,
            name: "second_name",
            profileInputType: "text",
            events: {
                blur: [secondNameValidation],
            },
        });

        const DisplayNameInput = new ProfileInput({
            label: "имя в чате",
            profileInputValue: this.props.currentUser?.display_name || "",
            isReadOnly: false,
            name: "display_name",
            profileInputType: "text",
        });

        const PhoneInput = new ProfileInput({
            label: "телефон",
            profileInputValue: this.props.currentUser?.phone || "",
            isReadOnly: false,
            name: "phone",
            profileInputType: "phone",
            events: {
                blur: [phoneValidation],
            },
        });

        const SaveButton = new ButtonForm({
            className: "primary-btn",
            text: "Сохранить данные",
            type: "submit",
            page: "settings",
            events: {
                click: [this.handleSave],
            },
        });

        this.children = {
            ...this.children,
            EmailInput,
            LoginInput,
            FirstNameInput,
            SecondNameInput,
            DisplayNameInput,
            PhoneInput,
            SaveButton,
        };
    }

    async handleAvatarChange(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const form = target.form as HTMLFormElement;
        await changeAvatar(form);
    }

    handleSave(e: Event) {
        e.preventDefault();
        emailValidation;
        loginValidation;
        firstNameValidation;
        secondNameValidation;
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
            changeUserData({ ...(getModel(e) as UserUpdateRequest) });
            router.go(Routes.Profile);
        } else {
            console.log("error form validation");
        }
    }

    componentDidUpdate(
        oldProps: ProfileChangeProps,
        newProps: ProfileChangeProps,
    ): boolean {
        if (oldProps.currentUser !== newProps.currentUser) {
            this.children.EmailInput.setProps({
                profileInputValue: newProps.currentUser?.email,
            });
            this.children.LoginInput.setProps({
                profileInputValue: newProps.currentUser?.login,
            });
            this.children.FirstNameInput.setProps({
                profileInputValue: newProps.currentUser?.first_name,
            });
            this.children.SecondNameInput.setProps({
                profileInputValue: newProps.currentUser?.second_name,
            });
            this.children.DisplayNameInput.setProps({
                profileInputValue: newProps.currentUser?.display_name,
            });
            this.children.PhoneInput.setProps({
                profileInputValue: newProps.currentUser?.phone,
            });
            this.children.Avatar.setProps({
                title: newProps.currentUser?.display_name || "",
                avatar: newProps.currentUser?.avatar
                    ? `${BASE_URL}/resources${newProps.currentUser?.avatar}`
                    : "/images/avatar.png",
            });
            return true;
        }
        return false;
    }

    render(): string {
        return `
        <section class="section profile">
            <div class="profile__container container">
                <form class="profile__form">
                    {{{Avatar}}}
                    {{{EmailInput}}}
                    {{{LoginInput}}}
                    {{{FirstNameInput}}}
                    {{{SecondNameInput}}}
                    {{{DisplayNameInput}}}
                    {{{PhoneInput}}}
                    <div class="profile__buttons">
                        {{{SaveButton}}}
                    </div>
                </form>
            </div>
        </section>
        `;
    }
}

const mapStateToProps: MapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(ProfileChange);
