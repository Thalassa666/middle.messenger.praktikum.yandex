import Block from '../../helpers/block';
import ProfileInputTemplate from './profileInput.hbs?raw';
import Handlebars from 'handlebars';

interface ProfileInputProps {
    label: string;
    profileInputValue: string;
    profileInputType?: string;
    isReadOnly: boolean;
    name: string;
}

class ProfileInput extends Block {
    constructor(props: ProfileInputProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(ProfileInputTemplate);
        return template(this.props);
    }
}

export default ProfileInput;
