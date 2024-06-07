import './chat.css'
import Block, { BlockProps } from '../../helpers/block';
import chatTemplate from './chat.hbs?raw';
import ChatHeader from '../../components/chatList/header';
import ChatItem from '../../components/chatList/item';
import BodyHeader from '../../components/chatBody/header';
import ChatBody from '../../components/chatBody/body';
import ChatMessage from '../../components/chatBody/message';

interface Message extends BlockProps {
    text: string;
    isMine: boolean;
}

interface ChatItemProps extends BlockProps {
    title: string;
    text: string;
    image: string;
    date: string;
    badge?: string;
    active?: boolean;
}
interface ChatProps extends BlockProps {
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

class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        const chatItems = props.chatItems.map(item => new ChatItem(item));

        const compiledChatItems = chatItems.map(item => item.getContent()?.outerHTML).join('');

        super('div', {
            ...props,
            ChatHeader: new ChatHeader({
                inputId: 'search',
                inputName: 'search'
            }),
            ChatItems: compiledChatItems,
            BodyHeader: new BodyHeader({
                image: props.bodyHeader.image,
                title: props.bodyHeader.title,
            }),
            ChatBody: new ChatBody({
                date: props.chatBody.date,
                messages: [...props.chatBody.messages],
            }),
            ChatMessage: new ChatMessage({
                attachIconSrc: '/icon/attach_file.svg',
                sendIconSrc: '/icon/arrow.svg',
            })
        });
    }

    render(): DocumentFragment {
        return this.compile(chatTemplate, this.props);
    }
}

export default Chat;
