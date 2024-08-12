import Block from "../../helpers/block";
import "./userSearch.css";
import { UserResponse } from "../../types/types";
import { MapStateToProps, connect } from "../../utils/connect";

class UserSearch extends Block {
    constructor(props: Record<string, unknown>) {
        super({
            ...props,
        });
    }

    init() {
        this.setProps({
            events: {
                click: [this.props.listClick],
            },
        });
    }

    render(): string {
        const list: string = this.props.usersSearch.length
            ? this.props.usersSearch
                  .map((item: UserResponse) => `<li>${item.login}</li>`)
                  .join("")
            : "<li>Пользователи не найдены</li>";

        if (!list) return `<div></div>`;

        return `
        <div class="userSearch__container">
          <ul class="userSearch">
            ${list}
          </ul>
        </div>
        `;
    }
}

const mapStateToProps: MapStateToProps = ({ usersSearch }) => ({ usersSearch });

export default connect(mapStateToProps)(UserSearch);
