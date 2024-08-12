import Block from "../../helpers/block";
import "./modal.css";
import ButtonForm from "../button";
import InputForm from "../input";
import UsersSearchList from "../userSearch";
import { EventsType } from "../../types/types";

interface ModalType {
    buttonChange?: ButtonForm;
}

export interface ModalProps {
    title?: string;
    buttonText?: string;
    name: string;
    notSelected?: boolean;
    clickButton?: EventListenerOrEventListenerObject;
    changeInput?: EventListenerOrEventListenerObject;
    events?: EventsType;
    listClick?: EventListenerOrEventListenerObject;
}

class Modal extends Block<ModalType> {
    constructor(props: ModalProps) {
        const clickEvent = props.clickButton || (() => {});
        const changeEvent = props.changeInput || (() => {});
        super({
            ...props,
            buttonChange: new ButtonForm({
                type: "primary",
                className: "primary-btn",
                text: props.buttonText || "Создать",
                events: {
                    click: [clickEvent],
                },
            }),
            input: new InputForm({
                name: props.name,
                type: "text",
                placeholder: "",
                events: {
                    change: changeEvent ? [changeEvent] : [],
                },
            }),
            usersSearchList: new UsersSearchList({
                listClick: props.listClick,
            }),
        });
    }

    render(): string {
        return `
        <div class="modal">
            <form class="modal__form">
                <h3 class="modal__form_title">{{title}}</h3>
                <div class="modal__form_inner">
                    {{{input}}}
                </div>
                <div class="modal__form_button">
                    {{{buttonChange}}}
                </div>
                {{{usersSearchList}}}
            </form>
        </div>
        `;
    }
}

export default Modal;
