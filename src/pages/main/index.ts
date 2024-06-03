import Block from '../../helpers/block.ts';
import './main.css';
import MainPageTemplate from './main.hbs?raw';

class MainPage extends Block {
    constructor() {
        super('div', {});
    }

    render(): DocumentFragment {
        return this.compile(MainPageTemplate, this.props);
    }
}

export default MainPage;
