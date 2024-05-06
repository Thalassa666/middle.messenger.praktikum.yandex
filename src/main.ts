import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages/index.ts';

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

const pageContexts: Record<PageName, Record<string, any>> = {
    main: {},
    login: {
        page: "signin",
    },
    signin: {
        page: "login",
    },
    error404: {
        error: "404",
        text: "Не туда попали",
        page: "main",
    },
    error500: {
        error: "500",
        text: "Мы уже чиним!",
        page: "main",
    },
    profile: {
        avatarUrl: "/icon/avatar.svg",
    },
    profileChange: {},
    profileChangePass: {},
    chat: {},
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

type PageName = keyof typeof pages;

function renderPage(pageName: PageName, context: Record<string, any> = {}) {
    const template = Handlebars.compile(pages[pageName]);
    const html = template(context);

    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', () => renderPage('main'));

document.addEventListener('click', function(event) {
    const target = event.target as HTMLElement;
    if (target && target.tagName === 'A' && target.getAttribute('page')) {
        event.preventDefault();
        const pageName = target.getAttribute('page') as PageName;

        const context = pageContexts[pageName] || {};
        renderPage(pageName, context);
    }
    if (target && target.tagName === 'BUTTON' && target.getAttribute('data-page')) {
        event.preventDefault();
        const pageName = target.getAttribute('data-page') as PageName;
        renderPage(pageName);
    }
});