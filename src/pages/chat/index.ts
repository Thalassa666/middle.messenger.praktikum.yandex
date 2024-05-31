import './chat.css'
import Block from '../../helpers/block';
import chatTemplate from './chat.hbs?raw';
import Handlebars from 'handlebars';
import ChatHeader from '../../components/chatList/header';
import ChatItem from '../../components/chatList/item';
import BodyHeader from '../../components/chatBody/header';
import ChatBody from '../../components/chatBody/body';
import ChatMessage from '../../components/chatBody/message';
import { messageValidation } from '../../helpers/validation.ts';

interface Message {
    text: string;
    isMine: boolean;
}

interface ChatItemProps {
    title: string;
    text: string;
    image: string;
    date: string;
    badge?: string;
    active?: boolean;
}
interface ChatProps {
    chatItems: ChatItemProps[];
    bodyHeader: {
        title: string;
        image: string;
    };
    chatBody: {
        date: string;
        messages: Message[];
    }
}

class Chat extends Block {
    constructor(props: ChatProps) {
        super('div', props);
    }

    componentDidMount(): boolean {
        setTimeout(() => {
            const form = this.element.querySelector('form');
            if (form) {
                form.addEventListener('submit', this.handleSubmit.bind(this));
            }
        }, 0);
        return true;
    }

    handleSubmit(event: Event) {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        const messageInput = target.querySelector('input[name="message"]') as HTMLInputElement;

        if (messageInput) {
            messageValidation({ target: messageInput });
        }

        const isMessageValid = !messageInput?.classList.contains('input-error');

        if (isMessageValid) {
            const formData = new FormData(target);
            const messageData = Object.fromEntries(formData.entries());
            console.log('MessageData:', messageData);
            messageInput.value = '';
        } else {
            console.log('Validation error, message not sent.');
        }
    }

    render(): string {
        const chatHeader = new ChatHeader({ inputId: 'search', inputName: 'search' });
        const chatItems = this.props.chatItems.map((item: ChatItemProps) => {
            return new ChatItem(item).render();
        }).join('');
        const bodyHeader = new BodyHeader(this.props.bodyHeader);
        const chatBody = new ChatBody(this.props.chatBody);
        const chatMessage = new ChatMessage({
            attachIconSrc: '/icon/attach_file.svg',
            sendIconSrc: '/icon/arrow.svg',
        });

        const template = Handlebars.compile(chatTemplate);

        return template({
            ChatHeader: chatHeader.render(),
            ChatItems: chatItems,
            BodyHeader: bodyHeader.render(),
            ChatBody: chatBody.render(),
            ChatMessage: chatMessage.render(),
        });
    }
}

export default Chat;
