import './header.css';
import { ChatsResponse } from "../../../types/types.ts";
import { MapStateToProps, connect } from '../../../utils/connect.ts';
import Block from '../../../helpers/block';
import Menu from '../menu';

export interface BodyHeaderProps {
    activeChat: ChatsResponse;
}

class BodyHeader extends Block<BodyHeaderProps> {
    constructor(props: BodyHeaderProps) {
        super({
            ...props,
            Menu: new Menu({}),
        });
    }

    render(): string {
        return `
        <div class="header-body">
            <div class="header-body__info">
                  <img class="header-body__img" src="${this.props.activeChat?.avatar || 'icon/icon.svg'}" alt="Аватар в чате">
                  <p class="header-body__title">${this.props.activeChat?.title || ''}</p>
            </div>
            <div class="header-body__button">
                {{{Menu}}}
                {{{MenuButton}}}
                {{{ChatsButtons}}}
            </div>
        </div>
        `
    }
}

const mapStateToProps: MapStateToProps = ({activeChat }) => ({activeChat })

export default connect(mapStateToProps)(BodyHeader);
