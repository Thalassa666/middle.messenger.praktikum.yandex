import { expect } from "chai";
import Router from "./Router";
import Block from "./block";
import { EventsType } from "../types/types";

interface Props {
    text?: string;
    events?: EventsType;
}

const Routes = {
    pageMain: "/",
    pageTest: "/page",
    errorPage: "*",
};

describe("Router", () => {
    let router: typeof Router;
    let PageClass: typeof Block<Record<string, unknown>>;
    let ErrorPageClass: typeof Block<Record<string, unknown>>;

    before(() => {
        class Page extends Block {
            constructor(props: Props) {
                super({
                    ...props,
                });
            }

            render(): string {
                return `<div>
                    <span id="test">{{text}}</span>
                    <button>{{button-text}}</button>
                </div>`;
            }
        }

        class ErrorPage extends Block {
            constructor(props: Props) {
                super({
                    ...props,
                });
            }

            render(): string {
                return `<div>
					  <span id="test">{{text}}</span>
					  <button>{{button-text}}</button>
				  </div>`;
            }
        }

        PageClass = Page;
        ErrorPageClass = ErrorPage;

        router = Router;
        router
            .use("/", PageClass)
            .use("/page", PageClass)
            .use("*", ErrorPageClass);
    });

    it(`Должен вернуть роут с адресом ${Routes.pageMain}`, () => {
        const route = router.getRoute(Routes.pageMain);
        expect(route?.match(Routes.pageMain)).to.be.eq(true);
    });

    it(`Должен вернуть роут с адресом ${Routes.pageTest}`, () => {
        const route = router.getRoute(Routes.pageTest);
        expect(route?.match(Routes.pageTest)).to.be.eq(true);
    });

    it(`Должен вернуть роут с адресом ${Routes.errorPage}`, () => {
        const route = router.getRoute(Routes.errorPage);
        expect(route?.match(Routes.errorPage)).to.be.eq(true);
    });

    it("Должен перейти на первую страницу", () => {
        router.start();
        expect(router.history.length).to.eq(1);
    });

    it("Переход на новую страницу должен менять состояние сущности history", () => {
        router.go(Routes.pageTest);
        expect(router.history.length).to.eq(2);
    });
});
