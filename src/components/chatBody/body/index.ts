import './body.css';
import Block, { BlockProps } from '../../../helpers/block';
import chatBodyTemplate from './body.hbs?raw';
import Handlebars from 'handlebars';

interface Message {
    text: string;
    isMine: boolean;
}

export interface ChatBodyProps extends BlockProps {
    date: string;
    messages: Message[];
}

class ChatBody extends Block<ChatBodyProps> {
    constructor(props: ChatBodyProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(chatBodyTemplate);
        return template(this.props);
    }
}

export default ChatBody;

