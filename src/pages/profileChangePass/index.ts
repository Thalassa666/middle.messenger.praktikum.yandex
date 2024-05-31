import Block, { BlockProps } from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import profileChangePassTemplate from './profileChangePass.hbs?raw';
import Handlebars from 'handlebars';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';
import { getFormData } from "../../helpers/getFormData.ts";
import { passwordValidation } from "../../helpers/validation.ts";

interface ProfileChangePassProps extends BlockProps {
    title: string;
    avatarUrl: string;
    oldPassword: string;
    newPassword: string;
}

class ProfileChangePass extends Block<ProfileChangePassProps> {
    constructor(props: ProfileChangePassProps) {
        super('div', props);
    }

    componentDidMount(): boolean {
        setTimeout(() => {
            this.addEventListeners();
        }, 0);
        return true;
    }

    addEventListeners(): void {
        const form = this.element.querySelector('form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));

            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('blur', this.handleBlur.bind(this));
            });
        }
    }

    handleBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        passwordValidation({ target });
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        const formData = getFormData(event);
        const target = event.target as HTMLFormElement;

        const inputs = target.querySelectorAll('input');
        inputs.forEach(input => {
            passwordValidation({ target: input });
        });

        const isFormValid = Array.from(inputs).every(input => !input.classList.contains('input-error'));

        if (isFormValid) {
            console.log('FormData:', formData);
            window.location.hash = '#profile';
        }
    }

    render(): string {
        const avatar = new Avatar({
            title: 'John Doe',
            changeAvatar: true,
            avatarUrl: "/icon/avatar.svg",
            name: 'avatar'
        });
        const oldPasswordInput = new ProfileInput({
            label: 'старый пароль',
            profileInputType: 'password',
            profileInputValue: this.props.oldPassword,
            name: 'oldPassword',
            isReadOnly: false,
        });
        const newPasswordInput = new ProfileInput({
            label: 'новый пароль',
            profileInputType: 'password',
            profileInputValue: this.props.newPassword,
            name: 'newPassword',
            isReadOnly: false,
        });
        const confirmPasswordInput = new ProfileInput({
            label: 'еще раз',
            profileInputType: 'password',
            profileInputValue: this.props.newPassword,
            name: 'confirmPassword',
            isReadOnly: false,
        });

        const saveButton = new ButtonForm({
            class: 'primary-btn',
            text: 'Сохранить пароль',
            type: 'submit',
            page: 'profile',
        });

        const template = Handlebars.compile(profileChangePassTemplate);

        return template({
            Avatar: avatar.render(),
            OldPasswordInput: oldPasswordInput.render(),
            NewPasswordInput: newPasswordInput.render(),
            ConfirmPasswordInput: confirmPasswordInput.render(),
            SaveButton: saveButton.render(),
        });
    }
}

export default ProfileChangePass;
