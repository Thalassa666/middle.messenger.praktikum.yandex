import Block from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import Avatar from '../../components/avatar';
import ButtonForm from '../../components/button';
import { passwordValidation } from "../../helpers/validation.ts";
import profileInput from "../../components/profileInput";
import handleSubmit from "../../helpers/submit.ts";
import { ChangePasswordRequest, UserResponse } from "types/types.ts";
import { changePassword } from '../../services/Users.service.ts';
import { getModel } from '../../utils/model.ts';
import Router from '../../helpers/Router.ts';
import { Routes } from '../../main.ts';
import { me } from '../../services/Auth.service.ts';
import { connect, MapStateToProps } from '../../utils/connect.ts';

const router = Router;

interface ProfileChangePassProps {
    currentUser: UserResponse | null;
    oldPassword: string;
    newPassword: string;
}

class ProfileChangePass extends Block<ProfileChangePassProps> {
    constructor(props: ProfileChangePassProps) {
        super({
            ...props,
            Avatar: new Avatar({
                name: 'Avatar',
                title: props.currentUser?.display_name || '',
                avatar: props.currentUser?.avatar ? `https://ya-praktikum.tech/api/v2/resources${props.currentUser.avatar}` : '',
                changeAvatar: false,
            }),
            OldPasswordInput: new profileInput({
                label: 'старый пароль',
                profileInputType: 'password',
                profileInputValue: props.oldPassword,
                name: 'oldPassword',
                isReadOnly: false,
                events: {
                    blur: [passwordValidation]
                }
            }),
            NewPasswordInput: new profileInput({
                label: 'новый пароль',
                profileInputType: 'password',
                profileInputValue: props.newPassword,
                name: 'newPassword',
                isReadOnly: false,
                events: {
                    blur: [passwordValidation]
                }
            }),
            ConfirmPasswordInput: new profileInput({
                label: 'еще раз',
                profileInputType: 'password',
                profileInputValue: props.newPassword,
                name: 'confirmPassword',
                isReadOnly: false,
                events: {
                    blur: [passwordValidation]
                }
            }),
            SaveButton: new ButtonForm({
                className: 'primary-btn',
                text: 'Сохранить пароль',
                type: 'submit',
                page: 'settings',
                events: {
                    click: [(e) => {
                        changePassword({ ...getModel(e) as ChangePasswordRequest });
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

    componentDidUpdate(): boolean {
        this.children.Avatar.setProps({
            title: this.props.currentUser?.display_name || '',
            avatar: this.props.currentUser?.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.currentUser.avatar}` : '',
        });
        return true;
    }

    render(): string {
        return `
        <section class="profile section">
            <div class="profile__container container">
                <form class="profile__form">
                    {{{Avatar}}}
                    {{{OldPasswordInput}}}
                    {{{NewPasswordInput}}}
                    {{{ConfirmPasswordInput}}}
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

export default connect(mapStateToProps)(ProfileChangePass);
