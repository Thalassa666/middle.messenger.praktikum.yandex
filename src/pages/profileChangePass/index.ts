import Block from '../../helpers/block';
import '../profile/profile.css';
import '../../style.css';
import Avatar from '../../components/avatar';
import ButtonForm from '../../components/button';
import { passwordValidation } from "../../helpers/validation.ts";
import ProfileInput from "../../components/profileInput";
import { ChangePasswordRequest, UserResponse } from "types/types.ts";
import { changePassword } from '../../services/Users.service.ts';
import { getModel } from '../../utils/model.ts';
import Router from '../../helpers/Router.ts';
import { Routes } from '../../main.ts';
import { me } from '../../services/Auth.service.ts';
import { connect, MapStateToProps } from '../../utils/connect.ts';
import { BASE_URL } from '../../constants/constants.ts';

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
                avatar: props.currentUser?.avatar ? `${BASE_URL}/resources${props.currentUser.avatar}` : '',
                changeAvatar: false,
            }),
        });
    }

    init(): void {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me()
        }
        getUserInfo();

        const OldPasswordInput = new ProfileInput({
            label: 'старый пароль',
            profileInputType: 'password',
            profileInputValue: this.props.oldPassword,
            name: 'oldPassword',
            isReadOnly: false,
            events: {
                blur: [passwordValidation]
            }
        });
        const NewPasswordInput = new ProfileInput({
            label: 'новый пароль',
            profileInputType: 'password',
            profileInputValue: this.props.newPassword,
            name: 'newPassword',
            isReadOnly: false,
            events: {
                blur: [passwordValidation]
            }
        });
        const ConfirmPasswordInput = new ProfileInput({
            label: 'еще раз',
            profileInputType: 'password',
            profileInputValue: this.props.newPassword,
            name: 'confirmPassword',
            isReadOnly: false,
            events: {
                blur: [passwordValidation]
            }
        });
        const SaveButton = new ButtonForm({
            className: 'primary-btn',
            text: 'Сохранить пароль',
            type: 'submit',
            page: 'settings',
            events: {
                click: [this.handleSave]
            }
        })

        this.children = {
            ...this.children,
            OldPasswordInput,
            NewPasswordInput,
            ConfirmPasswordInput,
            SaveButton,
        }
    }

    handleSave(e: Event) {
        e.preventDefault();
        passwordValidation;

        const form = (e.target as HTMLElement).closest('form');
        if (!form) return;

        const inputs = form.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach(input => {
            const blurEvent = new FocusEvent('blur', { relatedTarget: input });
            input.dispatchEvent(blurEvent);

            if (input.classList.contains('input-error')) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            changePassword({ ...getModel(e) as ChangePasswordRequest });
            router.go(Routes.Profile);
        } else {
            console.log('error form validation');
        }
    }

    componentDidUpdate(): boolean {
        this.children.Avatar.setProps({
            title: this.props.currentUser?.display_name || '',
            avatar: this.props.currentUser?.avatar ? `${BASE_URL}/resources/${this.props.currentUser.avatar}` : '',
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
