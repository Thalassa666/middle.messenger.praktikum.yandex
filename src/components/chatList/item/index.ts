import './item.css'
import Block from '../../../helpers/block';
import { ChatsResponse } from '../../../types/types.ts';
import { MapStateToProps, connect } from '../../../utils/connect.ts';
import { MessageService } from '../../../services/Message.service.ts';
import { getActiveChatUsers, setActiveChat } from '../../../services/Chats.service.ts';
import { BASE_URL } from '../../../constants/constants.ts';

export type ItemProps = {
    activeChat: ChatsResponse;
}

class Item extends Block {
    socket?: MessageService;
    constructor(props: ChatsResponse) {
        super({
            ...props,
            events: {
                click: [() => {
                    setActiveChat({ ...props });
                    getActiveChatUsers(props.id)
                }]
            }
        });
    }

    init() {
        this.setProps({socket: new MessageService()})
        this.props.socket.connectChat(this.props.currentUser.id, this.props.id)
        this.setProps({
            avatar: this.props.avatar
                ? `${BASE_URL}/resources${this.props.avatar}`
                : 'icon/icon.svg',
        });
    }

    componentDidUpdate(oldProps: ItemProps, newProps: ItemProps): boolean {
        if (oldProps.activeChat !== newProps.activeChat) {
            if (newProps.activeChat && newProps.activeChat.id === this.props.id) {
                console.log(newProps.activeChat.id);
                this.setProps({ active: 'active' })
                this.props.socket?.getOld()
            } else {
                this.setProps({ active: '' })
                this.props.socket?.clearMessageList()
            }
            return true
        }
        if (oldProps.activeChat?.avatar !== newProps.activeChat?.avatar) {
            this.children.img.setProps({ avatar: newProps.activeChat?.avatar ? `${BASE_URL}/resources${newProps.activeChat?.avatar}` : 'icon/icon.svg' });
        }
        return false
    }

    active: boolean = false

    render(): string {
        const { avatar, title, last_message, unread_count, active } = this.props;
        const name = last_message?.user.first_name || '';
        const content = last_message?.content || '';

        return `
        <div class="item ${active ? 'active' : ''}">
          <div class="item__img">
            <img src="${avatar}" alt="Аватар чата">
          </div>
          <div class="item__content">
            <p class="item__content_title">${title}</p>
            ${content ? `<p class="item__content_text">${content}</p>` : ''}
          </div>
          <div class="item__info">
            ${name ? `<p class="item__info_date">from: ${name}</p>` : ''}
            ${unread_count ? `<div class="item__info_badge">${unread_count}</div>` : ''}
          </div>
        </div>
        `;
    }
}

const mapStateToProps: MapStateToProps = ({currentUser, activeChat}) => ({currentUser, activeChat})

export default connect(mapStateToProps)(Item);
