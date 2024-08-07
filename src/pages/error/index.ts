import Block from '../../helpers/block.ts';
import './error.css';
import '../../style.css';
import ButtonForm from '../../components/button';

interface ErrorPageProps {
    error: string;
    text: string;
}

export default class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super({
            ...props,
            ButtonForm: new ButtonForm({
                className: 'secondary-btn',
                type: 'button',
                text: 'Назад',
                page: 'main',
                events: {

                }
            }),
        });
    }

    render(): string {
        return `
        <section class="section error">
          <div class="error__container container">
            <h1 class="error__title">{{error}}</h1>
            <p class="error__text">{{text}}</p>
              {{{ ButtonForm }}}
          </div>
        </section>
        `
    }
}
