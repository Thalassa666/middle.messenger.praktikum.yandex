import Block from "../../../helpers/block";
import { EventsType } from "../../../types/types";
import "./avatar.css";

export interface ChatAvatarProps {
    name: string;
    title: string;
    avatar: string;
    changeAvatar?: boolean;
    events?: EventsType;
}

class ChatAvatar extends Block<ChatAvatarProps> {
    constructor(props: ChatAvatarProps) {
        super(props);
    }
    render(): string {
        return `
        <div class="avatar">
          <div class="chat__avatar">
            <img src="{{avatar}}" alt="Аватар чата" class="chat-avatar">
            {{#if changeAvatar}}
                  <label for="chatInput">
                      <div class="chat__avatar_upload" name="{{name}}">
                          <p>Поменять аватар</p>
                      </div>
                  </label>
                  <input type="file" accept="image/png, image/jpeg, image/jpg, image/GIF, image/WebP" id="chatInput" class="chat__avatar_input" name="avatar">
            {{/if}}
          </div>
        </div>
        `;
    }
}

export default ChatAvatar;
