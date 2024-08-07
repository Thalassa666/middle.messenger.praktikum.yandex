import './chat.css';
import '../../components/buttonAdd/buttonAdd.css';
import Block from '../../helpers/block';
import ChatHeader from '../../components/chatList/header';
import ListItems from '../../components/chatList/list/index.ts';
import BodyHeader from '../../components/chatBody/header';
import ChatMessage from '../../components/chatBody/message';
import { UserResponse, ChatsResponse, Message, SocketType, ChatMessageType, CreateChat } from '../../types/types.ts';
import { me } from '../../services/Auth.service.ts';
import { connect, MapStateToProps } from '../../utils/connect.ts';
import { loadChats, createChat } from '../../services/Chats.service.ts';
import { getModel } from '../../utils/model.ts';
import InputForm from "../../components/input";
import ButtonForm from "../../components/button";
import Modal from '../../components/modal';
import ButtonAdd from '../../components/buttonAdd';

type ChatProps = {
    currentUser: UserResponse;
    chats: ChatsResponse[];
    activeChat: ChatsResponse;
    token?: string;
    messages?: Message[];
    sockets?: SocketType[];
    showModal: boolean;
}

class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super({
            ...props,
            ChatHeader: new ChatHeader({}),
            ListItems: new ListItems({}),
            BodyHeader: new BodyHeader({
                image: 'icon/icon.svg',
                title: 'active chat'
            }),
            ChatMessage: new ChatMessage({
                attachIconSrc: 'icon/icon.svg',
                sendIconSrc: 'icon/icon.svg',
            }),
            Message: new InputForm({
                name: 'message',
                type: 'text',
                placeholder: 'сообщение',
                className: 'message__form_input',
            }),
        });
    }
    init() {
        const getUserInfo = async () => {
            if (this.props.currentUser === null) await me();
            if (this.props.currentUser !== null) await loadChats();
            this.scrollToLastMessage();
        };
        getUserInfo();

        const addChat = (e: Event) => {
            createChat(getModel(e) as CreateChat);
            this.setProps({ showModal: false });
        }

        const closeModal = (e: Event) => {
            e.stopPropagation();
            if (e.target === this.children.ModalAddChat.getElement()) {
                this.setProps({ showModal: false })
            }
            const target = e.target as HTMLButtonElement;
            const form = target.form as HTMLFormElement;
            const input = form.querySelector('input[name="title"]') as HTMLInputElement;
            input.value = '';
        }
        const closeModalBind = closeModal.bind(this);

        const sendMessage = (e: Event) => {
            e.preventDefault();
            const model = getModel(e);
            const target = e.target as HTMLButtonElement;
            const form = target.form as HTMLFormElement;
            const input = form.querySelector('input[name="message"]') as HTMLInputElement;

            const message: ChatMessageType = {
                type: 'message',
                content: model.message
            };

            const socket = this.props.sockets?.filter(s => s.chatId === this.props.activeChat.id)[0];
            socket?.socket.send(message);

            input.value = '';
        }

        const SendButton = new ButtonForm({
            text: '>',
            type: 'submit',
            className: 'message__form_btn',
            events: {
                click: [sendMessage]
            }
        })

        const AddChatButton = new ButtonAdd({
            className: 'button_add',
            events: {
                click: [
                    () => this.setProps({ showModal: true })
                ]
            }
        })

        const ModalAddChat = new Modal ({
            title: 'Добавить чат',
            clickButton: addChat,
            name: 'title',
            events: {
                click: [
                    closeModalBind
                ]
            }
        })

        this.children = {
            ...this.children,
            SendButton,
            ModalAddChat,
            AddChatButton
        }
    }

    componentDidUpdate(oldProps: ChatProps, newProps: ChatProps) {
        if (oldProps.currentUser !== newProps.currentUser) {
            this.children.ListItems.setProps({
                currentUser: newProps.currentUser
            })
            return true
        }

        if (oldProps.showModal !== newProps.showModal) {
            return true
        }

        if (oldProps.activeChat !== newProps.activeChat) {
            return true
        }

        if (oldProps.messages?.length !== newProps.messages?.length) {
            this.scrollToLastMessage();
            return true
        }

        return false
    }

    scrollToLastMessage() {
        const observer = new MutationObserver(() => {
            const lastMessageElement = this.getElement()?.querySelector('#last');
            if (lastMessageElement) {
                lastMessageElement.scrollIntoView({ behavior: 'smooth' });
                observer.disconnect();
            }
        });

        observer.observe(this.getElement()!, {
            childList: true,
            subtree: true,
        });
    }

    formatTime(time: string): string {
        const date = new Date(time);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    render(): string {
        const messages = this.props.messages?.map(message => {
            return `<li class="message__content text ${message.user_id === this.props.currentUser.id ? 'self' : ''} " >
						<div class="message__content_item">
						    <p class="message_from">${this.formatTime(message.time)}
							<p class="message_text">${message.content}</p>
						</div>
					</li>`
        }).join('')
        return `
        <section class="chat">
            <div class="chat__list">
            ${this.props.currentUser?.display_name ? this.props.currentUser?.display_name : this.props.currentUser?.login}
                {{{ChatHeader}}}
                {{{ListItems}}}
                {{{AddChatButton}}}
            </div>
            <div class="chat__body">
            ${!this.props.activeChat ? `<p class="info_message">Выберите чат, чтобы отправить сообщение</p>`
            :
            `
                {{{BodyHeader}}}
                <section class="body">
                    <div class="body__chat">
                            <div class="body__chat_message">
                                <ul class="message__content">
                                    ${messages}
                                    <li id="last"></li>
                                </ul>
                            </div>
                    </div>
                </section>
                <section class="message">
                    <div class="icon">
                        <label for="fileInput">
                            <img class="message__icon" src="/icon/attach_file.svg" alt="прикрепить файл">
                        </label>
                        <input type="file" id="fileInput" name="file" class="profile__avatar_input">
                    </div>
                  <form class="message__form">
                      {{{ Message }}}
                      {{{ SendButton }}}
                  </form>
                </section>
            </div>
            `}
            ${this.props.showModal === true ? `{{{ModalAddChat}}}` : ``}
        </section>
        `
    }
}

const mapStateToProps: MapStateToProps = ({currentUser, activeChat, sockets, messages}) => ({currentUser, activeChat, sockets, messages});

export default connect(mapStateToProps)(Chat);
