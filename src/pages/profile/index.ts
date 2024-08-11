import Block from '../../helpers/block';
import './profile.css';
import '../../style.css';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';
import Router from '../../helpers/Router.ts';
import { me, logout } from '../../services/Auth.service.ts';
import { UserResponse } from "types/types.ts";
import { connect, MapStateToProps } from '../../utils/connect.ts';
import { BASE_URL } from '../../constants/constants.ts';

const router = Router;

interface ProfilePageProps {
    currentUser: UserResponse | null;
}

class ProfilePage extends Block<ProfilePageProps> {
    constructor(props: ProfilePageProps) {
        super({
            ...props,
            Avatar: new Avatar({
                title: props.currentUser?.display_name || '',
                avatar: props.currentUser?.avatar ? `${BASE_URL}/resources${props.currentUser.avatar}` : '',
                name: 'Avatar',
                changeAvatar: false,
            }),
            EmailInput: new ProfileInput({
                label: 'почта',
                profileInputValue: props.currentUser?.email || '',
                isReadOnly: true,
                name: 'email',
                profileInputType: 'email',
            }),
            LoginInput: new ProfileInput({
                label: 'логин',
                profileInputValue: props.currentUser?.login || '',
                isReadOnly: true,
                name: 'login',
                profileInputType: 'text',
            }),
            FirstNameInput: new ProfileInput({
                label: 'имя',
                profileInputValue: props.currentUser?.first_name || '',
                isReadOnly: true,
                name: 'first_name',
                profileInputType: 'text',
            }),
            SecondNameInput: new ProfileInput({
                label: 'фамилия',
                profileInputValue: props.currentUser?.second_name || '',
                isReadOnly: true,
                name: 'second_name',
                profileInputType: 'text',
            }),
            PhoneInput: new ProfileInput({
                label: 'телефон',
                profileInputValue: props.currentUser?.phone || '',
                isReadOnly: true,
                name: 'phone',
                profileInputType: 'phone',
            }),
            ChangeDataButton: new ButtonForm({
                className: 'secondary-btn',
                text: 'Изменить данные',
                type: 'button',
                page: '/settings/change',
                events: {
                    click: [(event: Event) => {
                        event.preventDefault();
                        this.handleButtonClick(event);
                    }]
                }
            }),
            ChangePassButton: new ButtonForm({
                className: 'secondary-btn',
                text: 'Сменить пароль',
                type: 'button',
                page: '/settings/changePass',
                events: {
                    click: [(event: Event) => {
                        event.preventDefault();
                        this.handleButtonClick(event);
                    }]
                }
            }),
            LogoutButton: new ButtonForm({
                className: 'secondary-btn',
                text: 'Выйти',
                type: 'button',
                page: '/',
                events: {
                    click: [logout]
                }
            })
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me()
        }
        getUserInfo()
    }

    componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
        this.children.EmailInput.setProps({ profileInputValue: this.props.currentUser?.email });
        this.children.LoginInput.setProps({ profileInputValue: this.props.currentUser?.login });
        this.children.FirstNameInput.setProps({ profileInputValue: this.props.currentUser?.first_name });
        this.children.SecondNameInput.setProps({ profileInputValue: this.props.currentUser?.second_name });
        this.children.PhoneInput.setProps({ profileInputValue: this.props.currentUser?.phone });
        this.children.Avatar.setProps({
            title: this.props.currentUser?.display_name || '',
            avatar: this.props.currentUser?.avatar ? `${BASE_URL}/resources/${this.props.currentUser.avatar}` : '',
        });
        return true;
        if (oldProps.currentUser !== newProps.currentUser) {
            this.children.EmailInput.setProps({ profileInputValue: newProps.currentUser?.email });
            this.children.LoginInput.setProps({ profileInputValue: newProps.currentUser?.login });
            this.children.FirstNameInput.setProps({ profileInputValue: newProps.currentUser?.first_name });
            this.children.SecondNameInput.setProps({ profileInputValue: newProps.currentUser?.second_name });
            this.children.PhoneInput.setProps({ profileInputValue: newProps.currentUser?.phone });
            this.children.Avatar.setProps({
                title: newProps.currentUser?.display_name || '',
                avatar: newProps.currentUser?.avatar ? `${BASE_URL}/resources/${newProps.currentUser?.avatar}` : ''
            });
            return true;
        }
    }


    handleButtonClick(event: Event) {
        const target = event.target as HTMLButtonElement;
        const page = target.getAttribute('data-page');
        if (page) {
            router.go(`${page}`);
        }
    }

    render(): string {
        return `
        <section class="profile section">
            <form class="profile__container container">
                {{{Avatar}}}
                {{{EmailInput}}}
                {{{LoginInput}}}
                {{{FirstNameInput}}}
                {{{SecondNameInput}}}
                {{{PhoneInput}}}
                <div class="profile__buttons">
                    {{{ChangeDataButton}}}
                    {{{ChangePassButton}}}
                    {{{LogoutButton}}}
                </div>
            </form>
        </section>
        `
    }
}

const mapStateToProps: MapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps)(ProfilePage);
