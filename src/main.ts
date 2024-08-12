import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./helpers/Router";

export const Routes = {
    Login: "/",
    Register: "/sign-up",
    Profile: "/settings",
    ProfileChange: "/settings/change",
    ProfileChangePass: "/settings/changePass",
    Chats: "/messenger",
    Error: "*",
};

const router = Router;

Object.entries(Components).forEach(([name, Component]) => {
    Handlebars.registerPartial(name, Component.toString());
});

router
    .use(Routes.Login, Pages.Login)
    .use(Routes.Register, Pages.Signin)
    .use(Routes.Profile, Pages.Profile)
    .use(Routes.ProfileChange, Pages.ProfileChange)
    .use(Routes.ProfileChangePass, Pages.ProfileChangePass)
    .use(Routes.Chats, Pages.Chat)
    .use(Routes.Error, Pages.ErrorPage)
    .start();
