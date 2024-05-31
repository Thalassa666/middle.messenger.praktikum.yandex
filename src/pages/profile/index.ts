import Block from '../../helpers/block';
import './profile.css';
import '../../style.css';
import ProfileTemplate from './profile.hbs?raw';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';
import Handlebars from 'handlebars';

interface ProfilePageProps {
    title: string;
    avatarUrl: string;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
}

class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {
        super('div', props);
    }

    componentDidMount(): boolean {
        setTimeout(() => {
            this.addEventListeners();
        }, 0);
        return true;
    }

    addEventListeners(): void {
        const buttons = this.element.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    handleButtonClick(event: Event) {
        const target = event.target as HTMLButtonElement;
        const page = target.getAttribute('data-page');
        if (page) {
            window.location.hash = `#${page}`;
        }
    }

    render(): string {
        const { title, avatarUrl, email, login, first_name, second_name, phone } = this.props;

        const avatar = new Avatar({ title, avatarUrl, name: 'avatar' });
        const emailInput = new ProfileInput({ label: 'почта', profileInputValue: email, isReadOnly: true, name: 'email', profileInputType: 'email' });
        const loginInput = new ProfileInput({ label: 'логин', profileInputValue: login, isReadOnly: true, name: 'login', profileInputType: 'text' });
        const firstNameInput = new ProfileInput({ label: 'имя', profileInputValue: first_name, isReadOnly: true, name: 'first_name', profileInputType: 'text' });
        const secondNameInput = new ProfileInput({ label: 'фамилия', profileInputValue: second_name, isReadOnly: true, name: 'second_name', profileInputType: 'text' });
        const phoneInput = new ProfileInput({ label: 'телефон', profileInputValue: phone, isReadOnly: true, name: 'phone', profileInputType: 'phone' });

        const changeDataButton = new ButtonForm({ class: 'secondary-btn', text: 'Изменить данные', type: 'button', page: 'profileChange' });
        const changePassButton = new ButtonForm({ class: 'secondary-btn', text: 'Сменить пароль', type: 'button', page: 'profileChangePass' });
        const logoutButton = new ButtonForm({ class: 'secondary-btn', text: 'Выйти', type: 'button', page: 'login' });

        const template = Handlebars.compile(ProfileTemplate);

        return template({
            Avatar: avatar.render(),
            EmailInput: emailInput.render(),
            LoginInput: loginInput.render(),
            FirstNameInput: firstNameInput.render(),
            SecondNameInput: secondNameInput.render(),
            PhoneInput: phoneInput.render(),
            ChangeDataButton: changeDataButton.render(),
            ChangePassButton: changePassButton.render(),
            LogoutButton: logoutButton.render(),
        });
    }
}

export default ProfilePage;
