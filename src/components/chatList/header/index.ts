import './header.css'
import Block, { BlockProps } from '../../../helpers/block.ts';
import headerTemplate from './header.hbs?raw';

export interface HeaderProps extends BlockProps {
    inputId: string;
    inputName: string;
}

class Header extends Block<BlockProps> {
    constructor(props: HeaderProps) {
        super('div', props);
    }

    render(): DocumentFragment {
        return this.compile(headerTemplate, this.props);
    }
}

export default Header;

