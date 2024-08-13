export interface BasePageContext {
    page?: string;
    error?: string;
    text?: string;
}

export interface ProfilePageContext extends BasePageContext {
    title: string;
    avatarUrl: string;
    changeAvatar?: boolean;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
}

export interface ProfileChangeContext extends BasePageContext {
    title: string;
    avatarUrl: string;
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
    oldPassword?: string;
    newPassword?: string;
}

export interface ChatPageContext extends BasePageContext {
    chatItems: {
        title: string;
        text: string;
        image: string;
        date: string;
        badge?: string;
        active?: boolean;
    }[];
    bodyHeader: {
        title: string;
        image: string;
    };
    chatBody: {
        date: string;
        messages: {
            text: string;
            isMine: boolean;
        }[];
    };
}

export interface LoginPageProps extends BasePageContext {
    loginPlaceholder: string;
    passwordPlaceholder: string;
}

export interface SigninPageProps extends BasePageContext {
    emailPlaceholder: string;
    loginPlaceholder: string;
    firstNamePlaceholder: string;
    secondNamePlaceholder: string;
    phonePlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
}

export type PageContext =
    | BasePageContext
    | ProfilePageContext
    | ProfileChangeContext
    | ChatPageContext
    | LoginPageProps
    | SigninPageProps;

export interface PageContextType {
    main: BasePageContext;
    login: LoginPageProps;
    signin: SigninPageProps;
    error404: BasePageContext;
    error500: BasePageContext;
    profile: ProfilePageContext;
    profileChange: ProfileChangeContext;
    profileChangePass: ProfileChangeContext;
    chat: ChatPageContext;
}

export const pageContexts: PageContextType = {
    main: {},
    login: {
        page: "signin",
        loginPlaceholder: "логин",
        passwordPlaceholder: "пароль",
    },
    signin: {
        page: "login",
        emailPlaceholder: "почта",
        loginPlaceholder: "логин",
        firstNamePlaceholder: "имя",
        secondNamePlaceholder: "фамилия",
        phonePlaceholder: "телефон",
        passwordPlaceholder: "пароль",
        confirmPasswordPlaceholder: "пароль еще раз",
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
        title: "John Doe",
        email: "john_doe@gmail.com",
        login: "johndoe",
        first_name: "John",
        second_name: "Doe",
        phone: "+56661234567",
    },
    profileChange: {
        avatarUrl: "/icon/avatar.svg",
        title: "John Doe",
        email: "john_doe@gmail.com",
        login: "johndoe",
        first_name: "John",
        second_name: "Doe",
        display_name: "JohnDoe",
        phone: "+56661234567",
    },
    profileChangePass: {
        title: "John Doe",
        avatarUrl: "/icon/avatar.svg",
        oldPassword: "password",
        newPassword: "password",
    },
    chat: {
        chatItems: [
            {
                title: "Jane Doe",
                text: "Привет, как дела?",
                image: "/icon/icon.svg",
                date: "15:30",
                badge: "3",
            },
            {
                title: "Колян",
                text: "Займи денег плиз",
                image: "/icon/icon.svg",
                date: "10:01",
            },
            {
                title: "Петя",
                text: "Бро го катку",
                image: "/icon/icon.svg",
                date: "Пт",
                active: true,
            },
            {
                title: "Автомеханик",
                text: "Здравствуйте, вы звонили по поводу ремонта? Перезвоните",
                image: "/icon/icon.svg",
                date: "Чт",
                badge: "1",
            },
            {
                title: "Мама",
                text: "Вы: Стикер",
                image: "/icon/icon.svg",
                date: "Ср",
            },
            {
                title: "Лена",
                text: "Вы: Привет",
                image: "/icon/icon.svg",
                date: "Вт",
            },
            {
                title: "Mary",
                text: "Вы: Стикер",
                image: "/icon/icon.svg",
                date: "Пн",
            },
            {
                title: "SpiderMan",
                text: "Стикер",
                image: "/icon/icon.svg",
                date: "Пн",
            },
        ],
        bodyHeader: { title: "Петя", image: "/icon/icon.svg" },
        chatBody: {
            date: "06 марта",
            messages: [
                { text: "Бро го катку", isMine: false },
                { text: "Нам нужен сап, ждем ток тебя", isMine: false },
                { text: "Ща", isMine: true },
                { text: "Залетай в дс", isMine: false },
            ],
        },
    },
};
