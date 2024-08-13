import "./message.css";
import Block from "../../../helpers/block";
import ButtonForm from "../../button";
import InputForm from "../../../components/input";

export interface ChatMessageProps {
    attachIconSrc: string;
    sendIconSrc: string;
}

class ChatMessage extends Block<ChatMessageProps> {
    constructor(props: ChatMessageProps) {
        super({
            ...props,
            Message: new InputForm({
                name: "message",
                type: "text",
                placeholder: "сообщение",
                className: "message__form_input",
            }),
            SendButton: new ButtonForm({
                text: "",
                type: "submit",
                img: "/icon/arrow.svg",
                className: "message__form_btn",
                events: {},
            }),
        });
    }

    render(): string {
        return `
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
        `;
    }
}

export default ChatMessage;
