import Block, { BlockProps } from '../../helpers/block';
import './profile.css';
import '../../style.css';
import ProfileTemplate from './profile.hbs?raw';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';

interface ProfilePageProps extends BlockProps {
    title: string;
    avatarUrl: string;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
}

class ProfilePage extends Block<ProfilePageProps> {
    constructor(props: ProfilePageProps) {
        super('div', {
            ...props,
            Avatar: new Avatar({
                title: props.title,
                avatarUrl: props.avatarUrl,
                name: 'Avatar',
                changeAvatar: false,
            }),
            EmailInput: new ProfileInput({
                label: 'почта',
                profileInputValue: props.email,
                isReadOnly: true,
                name: 'email',
                profileInputType: 'email',
            }),
            LoginInput: new ProfileInput({
                label: 'логин',
                profileInputValue: props.login,
                isReadOnly: true,
                name: 'login',
                profileInputType: 'text',
            }),
            FirstNameInput: new ProfileInput({
                label: 'имя',
                profileInputValue: props.first_name,
                isReadOnly: true,
                name: 'first_name',
                profileInputType: 'text',
            }),
            SecondNameInput: new ProfileInput({
                label: 'фамилия',
                profileInputValue: props.second_name,
                isReadOnly: true,
                name: 'second_name',
                profileInputType: 'text',
            }),
            PhoneInput: new ProfileInput({
                label: 'телефон',
                profileInputValue: props.phone,
                isReadOnly: true,
                name: 'phone',
                profileInputType: 'phone',
            }),
            ChangeDataButton: new ButtonForm({
                className: 'secondary-btn',
                text: 'Изменить данные',
                type: 'button',
                page: 'profileChange',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.handleButtonClick(event);
                    }
                }
            }),
            ChangePassButton: new ButtonForm({
                className: 'secondary-btn',
                text: 'Сменить пароль',
                type: 'button',
                page: 'profileChangePass',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.handleButtonClick(event);
                    }
                }
            }),
            LogoutButton: new ButtonForm({
                className: 'secondary-btn',
                text: 'Выйти',
                type: 'button',
                page: 'login',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.handleButtonClick(event);
                    }
                }
            })
        });
    }

    handleButtonClick(event: Event) {
        const target = event.target as HTMLButtonElement;
        const page = target.getAttribute('data-page');
        if (page) {
            window.location.hash = `#${page}`;
        }
    }

    render(): DocumentFragment {
        return this.compile(ProfileTemplate, this.props);
    }
}

export default ProfilePage;
