import Block, { BlockProps } from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import profileChangePassTemplate from './profileChangePass.hbs?raw';
import Avatar from '../../components/avatar';
import ButtonForm from '../../components/button';
import { passwordValidation } from "../../helpers/validation.ts";
import profileInput from "../../components/profileInput";
import handleSubmit from "../../helpers/submit.ts";

interface ProfileChangePassProps extends BlockProps {
    title: string;
    avatarUrl: string;
    oldPassword: string;
    newPassword: string;
}

class ProfileChangePass extends Block<ProfileChangePassProps> {
    constructor(props: ProfileChangePassProps) {
        super('div', {
            ...props,
            Avatar: new Avatar({
                name: 'Avatar',
                title: props.title,
                avatarUrl: props.avatarUrl,
                changeAvatar: true,
            }),
            OldPasswordInput: new profileInput({
                label: 'старый пароль',
                profileInputType: 'password',
                profileInputValue: props.oldPassword,
                name: 'oldPassword',
                isReadOnly: false,
                events: {
                    blur: passwordValidation
                }
            }),
            NewPasswordInput: new profileInput({
                label: 'новый пароль',
                profileInputType: 'password',
                profileInputValue: props.newPassword,
                name: 'newPassword',
                isReadOnly: false,
                events: {
                    blur: passwordValidation
                }
            }),
            ConfirmPasswordInput: new profileInput({
                label: 'еще раз',
                profileInputType: 'password',
                profileInputValue: props.newPassword,
                name: 'confirmPassword',
                isReadOnly: false,
                events: {
                    blur: passwordValidation
                }
            }),
            SaveButton: new ButtonForm({
                className: 'primary-btn',
                text: 'Сохранить пароль',
                type: 'submit',
                page: 'profile',
                events: {
                    click: (event: Event) => handleSubmit(event)
                }
            })
        });
    }

    render(): DocumentFragment {
        return this.compile(profileChangePassTemplate, this.props);
    }
}

export default ProfileChangePass;
