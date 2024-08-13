import "./header.css";
import {
    ChatsResponse,
    ChangeChatAvatarSubmitData,
} from "../../../types/types";
import { MapStateToProps, connect } from "../../../utils/connect";
import Block from "../../../helpers/block";
import Menu from "../menu";
import ChatAvatar from "../../chatBody/avatar/index";
import { updateChatAvatar } from "../../../services/Chats.service";
import { BASE_URL } from "../../../constants/constants";

export interface BodyHeaderProps {
    activeChat: ChatsResponse;
}

class BodyHeader extends Block<BodyHeaderProps> {
    constructor(props: BodyHeaderProps) {
        super({
            ...props,
            Menu: new Menu({}),
            ChatAvatar: new ChatAvatar({
                name: "avatar",
                title: "ChatAvatar",
                avatar: props.activeChat?.avatar
                    ? `${BASE_URL}/resources${props.activeChat.avatar}`
                    : "icon/icon.svg",
                changeAvatar: true,
                events: {
                    change: [(e: Event) => this.handleAvatarChange(e)],
                },
            }),
        });
    }

    private async handleAvatarChange(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file && this.props.activeChat) {
            const formData: ChangeChatAvatarSubmitData = {
                chatId: this.props.activeChat.id,
                file,
            };
            await updateChatAvatar(formData);
        }
    }

    componentDidUpdate(
        oldProps: BodyHeaderProps,
        newProps: BodyHeaderProps,
    ): boolean {
        this.children.ChatAvatar.setProps({
            avatar: newProps.activeChat?.avatar
                ? `${BASE_URL}/resources${newProps.activeChat?.avatar}`
                : "icon/icon.svg",
        });
        if (oldProps.activeChat?.avatar !== newProps.activeChat?.avatar) {
            this.children.ChatAvatar.setProps({
                avatar: newProps.activeChat?.avatar
                    ? `${BASE_URL}/resources${newProps.activeChat?.avatar}`
                    : "icon/icon.svg",
            });
            return true;
        }
        return false;
    }

    render(): string {
        return `
        <div class="header-body">
            <form class="header-body__info">
                  {{{ChatAvatar}}}
                  <p class="header-body__title">${this.props.activeChat?.title || ""}</p>
            </form>
            <div class="header-body__button">
                {{{Menu}}}
                {{{MenuButton}}}
                {{{ChatsButtons}}}
            </div>
        </div>
        `;
    }
}

const mapStateToProps: MapStateToProps = ({ activeChat }) => ({ activeChat });

export default connect(mapStateToProps)(BodyHeader);
