import './avatar.css';
import Block from '../../helpers/block';
import { EventsType } from "../../types/types.ts";

export interface AvatarProps {
    name: string;
    title: string;
    avatar: string;
    changeAvatar?: boolean;
    events?: EventsType;
}

class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super(props);
    }
    render(): string {
        return `
        <div class="avatar">
          <div class="profile__avatar">
            <img src="{{avatar}}" alt="Аватар профиля" class="user-avatar">
              {{#if changeAvatar}}
                  <label for="avatarInput">
                      <div class="profile__avatar_upload" name="{{name}}">
                          <p>Поменять аватар</p>
                      </div>
                  </label>
                    <input type="file" accept="image/png, image/jpeg, image/jpg, image/GIF, image/WebP" id="avatarInput" class="profile__avatar_input" name="avatar">
              {{/if}}
          </div>
            <h2 class="profile__avatar_title">{{title}}</h2>
        </div>
        `
    }
}

export default Avatar;
