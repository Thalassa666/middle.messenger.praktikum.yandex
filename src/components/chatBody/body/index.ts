import './body.css';
import Block from '../../../helpers/block';
import chatBodyTemplate from './body.hbs?raw';
import Handlebars from 'handlebars';

interface Message {
    text: string;
    isMine: boolean;
}

interface ChatBodyProps {
    date: string;
    messages: Message[];
}

class ChatBody extends Block {
    constructor(props: ChatBodyProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(chatBodyTemplate);
        return template(this.props);
    }
}

export default ChatBody;

