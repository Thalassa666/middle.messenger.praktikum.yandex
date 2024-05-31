import './item.css'
import Block from '../../../helpers/block';
import itemTemplate from './item.hbs?raw';
import Handlebars from 'handlebars';

interface ItemProps {
    active?: boolean;
    image: string;
    title: string;
    text: string;
    date: string;
    badge?: string;
}

class Item extends Block{
    constructor(props: ItemProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(itemTemplate);
        return template(this.props);
    }
}

export default Item;

