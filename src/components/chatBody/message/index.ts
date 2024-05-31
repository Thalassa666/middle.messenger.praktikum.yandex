import './message.css';
import Block, { BlockProps } from '../../../helpers/block';
import chatMessageTemplate from './message.hbs?raw';
import Handlebars from 'handlebars';

export interface ChatMessageProps extends BlockProps {
    attachIconSrc: string;
    sendIconSrc: string;
}

class ChatMessage extends Block<ChatMessageProps> {
    constructor(props: ChatMessageProps) {
        super('div', props);
    }

    render(): string {
        const { attachIconSrc, sendIconSrc } = this.props;
        const template = Handlebars.compile(chatMessageTemplate);
        return template({
            attachIconSrc,
            sendIconSrc,
        });
    }
}

export default ChatMessage;
