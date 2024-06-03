import './message.css';
import Block, { BlockProps } from '../../../helpers/block';
import chatMessageTemplate from './message.hbs?raw';
import ButtonForm from "../../button";
import InputForm from "../../../components/input";

export interface ChatMessageProps extends BlockProps {
    attachIconSrc: string;
    sendIconSrc: string;
}

class ChatMessage extends Block<ChatMessageProps> {
    constructor(props: ChatMessageProps) {
        super('div', {
            ...props,
            Message: new InputForm({
                name: 'message',
                type: 'text',
                placeholder: 'сообщение',
                className: 'message__form_input',
            }),
            SendButton: new ButtonForm({
                text: '',
                img: '/icon/arrow.svg',
                className: 'message__form_btn',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();

                    }
                }
            })
        });
    }

    render(): DocumentFragment {
        return this.compile(chatMessageTemplate, this.props);
    }
}

export default ChatMessage;
