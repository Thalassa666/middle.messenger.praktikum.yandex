import "./body.css";
import Block from "../../../helpers/block";

interface Message {
    text: string;
    isMine: boolean;
}

export interface ChatBodyProps {
    date: string;
    messages: Message[];
}

class ChatBody extends Block<ChatBodyProps> {
    constructor(props: ChatBodyProps) {
        super(props);
    }

    render(): string {
        return `
        <section class="body">
            <div class="body__date">{{date}}</div>
            <div class="body__chat">
                {{#each messages}}
                    <div class="body__chat_message {{#if this.isMine}}body__chat_message--right{{/if}}">
                        <div class="message__content">{{this.text}}</div>
                    </div>
                {{/each}}
            </div>
        </section>
    `;
    }
}

export default ChatBody;
