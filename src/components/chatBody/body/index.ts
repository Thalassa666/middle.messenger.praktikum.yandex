import './body.css';
import Block, { BlockProps } from '../../../helpers/block';
import chatBodyTemplate from './body.hbs?raw';

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

    render(): DocumentFragment {
        return this.compile(chatBodyTemplate, this.props);
    }
}

export default ChatBody;

