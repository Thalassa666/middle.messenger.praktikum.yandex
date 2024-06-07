import Block, { BlockProps } from '../../helpers/block';
import ProfileInputTemplate from './profileInput.hbs?raw';

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

    render(): DocumentFragment {
        return this.compile(ProfileInputTemplate, this.props);
    }
}

export default ProfileInput;
