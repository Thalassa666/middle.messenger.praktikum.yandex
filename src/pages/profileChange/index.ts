import Block from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import Avatar from '../../components/avatar';
import ProfileInput from '../../components/profileInput';
import ButtonForm from '../../components/button';
import {
    emailValidation,
    firstNameValidation,
    loginValidation,
    phoneValidation,
    secondNameValidation
} from '../../helpers/validation.ts';
import handleSubmit from '../../helpers/submit.ts';
import { connect, MapStateToProps } from '../../utils/connect.ts';
import { me } from '../../services/Auth.service.ts';
import { UserResponse, UserUpdateRequest } from 'types/types.ts';
import { changeAvatar, changeUserData } from '../../services/Users.service.ts';
import { getModel } from '../../utils/model.ts';
import Router from '../../helpers/Router.ts';
import { Routes } from '../../main.ts';

const router = Router;

interface ProfileChangeProps {
    currentUser: UserResponse | null;
}

class ProfileChange extends Block<ProfileChangeProps> {
    constructor(props: ProfileChangeProps) {
        super({
            ...props,
            Avatar: new Avatar({
                title: props.currentUser?.display_name || '',
                avatar: props.currentUser?.avatar ? `https://ya-praktikum.tech/api/v2/resources${props.currentUser.avatar}` : '/images/avatar.png',
                name: 'Avatar',
                changeAvatar: true,
                events: {
                    change: [(e: Event) => this.handleAvatarChange(e)]
                }
            }),
            EmailInput: new ProfileInput({
                label: 'почта',
                profileInputValue: props.currentUser?.email || '',
                isReadOnly: false,
                name: 'email',
                profileInputType: 'email',
                events: {
                    blur: [emailValidation]
                }
            }),
            LoginInput: new ProfileInput({
                label: 'логин',
                profileInputValue: props.currentUser?.login || '',
                isReadOnly: false,
                name: 'login',
                profileInputType: 'text',
                events: {
                    blur: [loginValidation]
                }
            }),
            FirstNameInput: new ProfileInput({
                label: 'имя',
                profileInputValue: props.currentUser?.first_name || '',
                isReadOnly: false,
                name: 'first_name',
                profileInputType: 'text',
                events: {
                    blur: [firstNameValidation]
                }
            }),
            SecondNameInput: new ProfileInput({
                label: 'фамилия',
                profileInputValue: props.currentUser?.second_name || '',
                isReadOnly: false,
                name: 'second_name',
                profileInputType: 'text',
                events: {
                    blur: [secondNameValidation]
                }
            }),
            DisplayNameInput: new ProfileInput({
                label: 'имя в чате',
                profileInputValue: props.currentUser?.display_name || '',
                isReadOnly: false,
                name: 'display_name',
                profileInputType: 'text',
            }),
            PhoneInput: new ProfileInput({
                label: 'телефон',
                profileInputValue: props.currentUser?.phone || '',
                isReadOnly: false,
                name: 'phone',
                profileInputType: 'phone',
                events: {
                    blur: [phoneValidation]
                }
            }),
            SaveButton: new ButtonForm({
                className: 'primary-btn',
                text: 'Сохранить данные',
                type: 'submit',
                page: 'settings',
                events: {
                    click: [(e) => {
                        changeUserData({ ...getModel(e) as UserUpdateRequest });
                        handleSubmit;
                        router.go(Routes.Profile);
                    }]
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

    async handleAvatarChange(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const form = target.form as HTMLFormElement;
        await changeAvatar(form);
    }

    componentDidUpdate(oldProps: ProfileChangeProps, newProps: ProfileChangeProps): boolean {
        this.children.EmailInput.setProps({ profileInputValue: this.props.currentUser?.email });
        this.children.LoginInput.setProps({ profileInputValue: this.props.currentUser?.login });
        this.children.FirstNameInput.setProps({ profileInputValue: this.props.currentUser?.first_name });
        this.children.SecondNameInput.setProps({ profileInputValue: this.props.currentUser?.second_name });
        this.children.PhoneInput.setProps({ profileInputValue: this.props.currentUser?.phone });
        this.children.Avatar.setProps({
            title: this.props.currentUser?.display_name || '',
            avatar: this.props.currentUser?.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.currentUser.avatar}` : '',
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
                avatar: newProps.currentUser?.avatar ? `https://ya-praktikum.tech/api/v2/resources${newProps.currentUser?.avatar}` : '/images/avatar.png',
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
        `
    }
}

const mapStateToProps: MapStateToProps = ({currentUser}) => ({currentUser});

export default connect(mapStateToProps)(ProfileChange);
