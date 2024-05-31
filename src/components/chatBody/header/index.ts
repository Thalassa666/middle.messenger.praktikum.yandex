import './header.css'
import Block from '../../../helpers/block';
import bodyHeaderTemplate from './header.hbs?raw';
import Handlebars from 'handlebars';

interface BodyHeaderProps {
    image: string;
    title: string;
}

class BodyHeader extends Block {
    constructor(props: BodyHeaderProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(bodyHeaderTemplate);
        return template(this.props);
    }
}

export default BodyHeader;
