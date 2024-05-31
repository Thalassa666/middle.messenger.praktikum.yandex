import './avatar.css';
import Block, { BlockProps } from '../../helpers/block';
import AvatarTemplate from './avatar.hbs?raw';

export interface AvatarProps extends BlockProps {
    name: string;
    title: string;
    avatarUrl: string;
    changeAvatar?: boolean;
}

class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super('avatar', props);
    }
    render(): string {
        const { name, title, avatarUrl } = this.props;
        return AvatarTemplate
            .replace('{{name}}', name)
            .replace('{{title}}', title)
            .replace('{{avatarUrl}}', avatarUrl)
    }
}

export default Avatar;
