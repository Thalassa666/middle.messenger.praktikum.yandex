import Block, { BlockProps } from '../../helpers/block.ts';
import './error.css';
import '../../style.css';
import errorPageTemplate from './error.hbs?raw';
import ButtonForm from '../../components/button';

interface ErrorPageProps extends BlockProps {
    error: string;
    text: string;
}

export default class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super('div', {
            ...props,
            ButtonForm: new ButtonForm({
                className: 'secondary-btn',
                type: 'button',
                text: 'Назад',
                page: 'main',
                events: {
                    click: () => window.location.hash = `#main`
                }
            }),
        });
    }

    render(): DocumentFragment {
        return this.compile(errorPageTemplate, this.props);
    }
}
