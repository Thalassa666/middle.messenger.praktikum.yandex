import Block, { BlockProps } from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import profileChangeTemplate from './profileChange.hbs?raw';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    phoneValidation,
    secondNameValidation
} from "../../helpers/validation.ts";
import handleSubmit from "../../helpers/submit.ts";

interface ProfileChangeProps extends BlockProps {
    title: string;
    avatarUrl: string;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

class ProfileChange extends Block<ProfileChangeProps> {
    constructor(props: ProfileChangeProps) {
        super('div', {
            ...props,
            Avatar: new Avatar({
                title: props.title,
                avatarUrl: props.avatarUrl,
                name: 'Avatar',
                changeAvatar: true,
            }),
            EmailInput: new ProfileInput({
                label: 'почта',
                profileInputValue: props.email,
                isReadOnly: false,
                name: 'email',
                profileInputType: 'email',
                events: {
                    blur: emailValidation
                }
            }),
            LoginInput: new ProfileInput({
                label: 'логин',
                profileInputValue: props.login,
                isReadOnly: false,
                name: 'login',
                profileInputType: 'text',
                events: {
                    blur: loginValidation
                }
            }),
            FirstNameInput: new ProfileInput({
                label: 'имя',
                profileInputValue: props.first_name,
                isReadOnly: false,
                name: 'first_name',
                profileInputType: 'text',
                events: {
                    blur: firstNameValidation
                }
            }),
            SecondNameInput: new ProfileInput({
                label: 'фамилия',
                profileInputValue: props.second_name,
                isReadOnly: false,
                name: 'second_name',
                profileInputType: 'text',
                events: {
                    blur: secondNameValidation
                }
            }),
            DisplayNameInput: new ProfileInput({
                label: 'имя в чате',
                profileInputValue: props.display_name,
                isReadOnly: false,
                name: 'display_name',
                profileInputType: 'text',
            }),
            PhoneInput: new ProfileInput({
                label: 'телефон',
                profileInputValue: props.phone,
                isReadOnly: false,
                name: 'phone',
                profileInputType: 'phone',
                events: {
                    blur: phoneValidation
                }
            }),
            SaveButton: new ButtonForm({
                className: 'primary-btn',
                text: 'Сохранить данные',
                type: 'submit',
                page: 'profile',
                events: {
                    click: (event: Event) => handleSubmit(event)
                }
            })
        });
    }

    render(): DocumentFragment {
        return this.compile(profileChangeTemplate, this.props);
    }
}

export default ProfileChange;
