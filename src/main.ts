import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { pageContexts, PageContextType } from './pageContext.ts';

const pages = {
    main: Pages.MainPage,
    login: Pages.Login,
    signin: Pages.Signin,
    error404: Pages.ErrorPage,
    error500: Pages.ErrorPage,
    profile: Pages.Profile,
    profileChange: Pages.ProfileChange,
    profileChangePass: Pages.ProfileChangePass,
    chat: Pages.Chat,
};

Object.entries(Components).forEach(([name, Component]) => {
    Handlebars.registerPartial(name, (props: any) => new Component(props).render());
});

export type PageName = keyof typeof pages;

function renderPage<T extends PageName>(pageName: T, context: PageContextType[T]) {
    const PageClass = pages[pageName];
    // @ts-ignore
    const pageInstance = new PageClass(context);

    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.innerHTML = '';
        appElement.appendChild(pageInstance.getContent());
    }
}

function handleHashChange() {
    const hash = window.location.hash.substring(1) as PageName;
    if (pages[hash]) {
        renderPage(hash, pageContexts[hash]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
});

document.addEventListener('DOMContentLoaded', () => renderPage('main', pageContexts.main));

document.addEventListener('click', function(event) {
    const target = event.target as HTMLElement;
    if (target && target.tagName === 'A' && target.getAttribute('page')) {
        event.preventDefault();
        const pageName = target.getAttribute('page') as PageName;
        window.location.hash = `#${pageName}`;
    }
    /*if (target && target.tagName === 'BUTTON' && target.getAttribute('data-page')) {
        event.preventDefault();
        const pageName = target.getAttribute('data-page') as PageName;

        const newContext = { ...currentContext, ...pageContexts[pageName] };
        renderPage(pageName, newContext);
    }*/
});
