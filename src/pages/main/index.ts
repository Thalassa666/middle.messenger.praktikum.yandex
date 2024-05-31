import Block from '../../helpers/block.ts';
import './main.css';
import MainPageTemplate from './main.hbs?raw';

class MainPage extends Block {
    constructor() {
        super('div', {});
    }

    render(): string {
        return MainPageTemplate;
    }
}

export default MainPage;
