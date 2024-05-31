import Block, { BlockProps } from '../../helpers/block.ts';
import './error.css';
import '../../style.css';
import ErrorPageTemplate from './error.hbs?raw';
import ButtonForm from '../../components/button';

interface ErrorPageProps extends BlockProps {
    error: string;
    text: string;
}

class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super('div', props);
    }

    componentDidMount(): boolean {
        setTimeout(() => {
            const backButton = this.element.querySelector('button[data-page="main"]');
            if (backButton) {
                backButton.addEventListener('click', this.handleLoginClick);
            }
        }, 0);
        return true;
    }

    handleLoginClick() {
        window.location.hash = '#main';
    }

    render(): string {
        const { error, text } = this.props;

        const backButton = new ButtonForm({
            class: 'secondary-btn',
            type: 'button',
            text: 'Назад',
            page: 'main'
        });

        const buttonHtml = backButton.render();

        return ErrorPageTemplate
            .replace('{{error}}', error)
            .replace('{{text}}', text)
            .replace('{{> ButtonForm }}', buttonHtml);
    }
}

export default ErrorPage;
