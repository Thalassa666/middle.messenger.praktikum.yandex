import './header.css'
import Block, { BlockProps } from '../../../helpers/block';
import bodyHeaderTemplate from './header.hbs?raw';

export interface BodyHeaderProps extends BlockProps {
    image: string;
    title: string;
}

class BodyHeader extends Block<BodyHeaderProps> {
    constructor(props: BodyHeaderProps) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(bodyHeaderTemplate, this.props);
    }
}

export default BodyHeader;
