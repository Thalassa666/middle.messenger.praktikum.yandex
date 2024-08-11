import Block from '../../helpers/block';
import { EventsType } from "../../types/types.ts";

export interface ProfileInputProps {
    label: string;
    profileInputValue: string;
    profileInputType?: string;
    isReadOnly: boolean;
    name: string;
    events?: EventsType;
}

class ProfileInput extends Block<ProfileInputProps> {
    constructor(props: ProfileInputProps) {
        super(props);
    }

    _addEvents() {
        super._addEvents();

        const inputElement = this.getContent()?.querySelector('input');
        if (inputElement && this.props.events?.blur) {
            this.props.events.blur.forEach(func => {
                inputElement.addEventListener('blur', func);
            });
        }
    }

    render(): string {
        return `
        <div class="profile-input">
          <label for="{{profileInputId}}" class="profile-input__label">
            {{label}}
          </label>
          <input
          type="{{profileInputType}}"
          id="{{profileInputId}}"
          name="{{name}}"
          value="{{profileInputValue}}"
          class="profile-input__input"
          {{#if isReadOnly}}readonly{{/if}}
          >
        </div>
        `;
    }
}

export default ProfileInput;
