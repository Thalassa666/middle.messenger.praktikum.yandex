import './header.css'
import Block from '../../../helpers/block.ts';
import headerTemplate from './header.hbs?raw';
import Handlebars from 'handlebars';

interface HeaderProps {
    inputId: string;
    inputName: string;
}

class Header extends Block {
    constructor(props: HeaderProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(headerTemplate);
        return template(this.props);
    }
}

export default Header;

