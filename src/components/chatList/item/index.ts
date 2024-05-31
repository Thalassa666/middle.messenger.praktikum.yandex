import './item.css'
import Block, { BlockProps } from '../../../helpers/block';
import itemTemplate from './item.hbs?raw';
import Handlebars from 'handlebars';

export interface ItemProps extends BlockProps {
    active?: boolean;
    image: string;
    title: string;
    text: string;
    date: string;
    badge?: string;
}

class Item extends Block<ItemProps> {
    constructor(props: ItemProps) {
        super('div', props);
    }

    render(): string {
        const template = Handlebars.compile(itemTemplate);
        return template(this.props);
    }
}

export default Item;

