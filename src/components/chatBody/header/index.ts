import './header.css'
import Block, { BlockProps } from '../../../helpers/block';
import bodyHeaderTemplate from './header.hbs?raw';
import Handlebars from 'handlebars';

export interface BodyHeaderProps extends BlockProps {
    image: string;
    title: string;
}

class BodyHeader extends Block<BodyHeaderProps> {
    constructor(props: BodyHeaderProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(bodyHeaderTemplate);
        return template(this.props);
    }
}

export default BodyHeader;
