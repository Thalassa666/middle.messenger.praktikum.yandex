import Block, { BlockProps } from '../../helpers/block';
import ProfileInputTemplate from './profileInput.hbs?raw';
import Handlebars from 'handlebars';

export interface ProfileInputProps extends BlockProps {
    label: string;
    profileInputValue: string;
    profileInputType?: string;
    isReadOnly: boolean;
    name: string;
}

class ProfileInput extends Block<ProfileInputProps> {
    constructor(props: ProfileInputProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(ProfileInputTemplate);
        return template(this.props);
    }
}

export default ProfileInput;
