import Block from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import profileChangeTemplate from './profileChange.hbs?raw';
import Handlebars from 'handlebars';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';
import { getFormData } from "../../helpers/getFormData.ts";
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    phoneValidation,
    secondNameValidation
} from "../../helpers/validation.ts";

interface ProfileChangeProps {
    title: string;
    avatarUrl: string;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

class ProfileChange extends Block {
    constructor(props: ProfileChangeProps) {
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
        switch (target.name) {
            case 'email':
                emailValidation({ target });
                break;
            case 'login':
                loginValidation({ target });
                break;
            case 'first_name':
                firstNameValidation({ target });
                break;
            case 'second_name':
                secondNameValidation({ target });
                break;
            case 'phone':
                phoneValidation({ target });
                break;
        }
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        const formData = getFormData(event);
        const target = event.target as HTMLFormElement;

        const inputs = target.querySelectorAll('input');
        inputs.forEach(input => {
            this.handleBlur({ target: input } as unknown as Event);
        });

        const isFormValid = Array.from(inputs).every(input => !input.classList.contains('input-error'));

        if (isFormValid) {
            window.location.hash = '#profile';
            console.log('FormData:', formData);
        }
    }

    render(): string {
        const avatar = new Avatar({
            title: "John Doe",
            changeAvatar: true,
            avatarUrl: "/icon/avatar.svg",
            name: 'avatar'
        });
        const emailInput = new ProfileInput({
            label: 'почта',
            profileInputValue: this.props.email,
            profileInputType: 'email',
            isReadOnly: false,
            name: 'email'
        });
        const loginInput = new ProfileInput({
            label: 'логин',
            profileInputValue: this.props.login,
            profileInputType: 'text',
            isReadOnly: false,
            name: 'login'
        });
        const firstNameInput = new ProfileInput({
            label: 'имя',
            profileInputValue: this.props.first_name,
            profileInputType: 'text',
            isReadOnly: false,
            name: 'first_name'
        });
        const secondNameInput = new ProfileInput({
            label: 'фамилия',
            profileInputValue: this.props.second_name,
            profileInputType: 'text',
            isReadOnly: false,
            name: 'second_name'
        });
        const displayNameInput = new ProfileInput({
            label: 'имя в чате',
            profileInputValue: this.props.display_name,
            profileInputType: 'text',
            isReadOnly: false,
            name: 'display_name'
        });
        const phoneInput = new ProfileInput({
            label: 'телефон',
            profileInputValue: this.props.phone,
            profileInputType: 'phone',
            isReadOnly: false,
            name: 'phone'
        });

        const saveButton = new ButtonForm({
            class: 'primary-btn',
            text: 'Сохранить данные',
            type: 'submit',
            page: 'profile',
            handlers: {
                click: getFormData,
            }
        });

        const template = Handlebars.compile(profileChangeTemplate);

        return template({
            Avatar: avatar.render(),
            EmailInput: emailInput.render(),
            LoginInput: loginInput.render(),
            FirstNameInput: firstNameInput.render(),
            SecondNameInput: secondNameInput.render(),
            DisplayNameInput: displayNameInput.render(),
            PhoneInput: phoneInput.render(),
            SaveButton: saveButton.render(),
        });
    }
}

export default ProfileChange;
