import Block from '../../../helpers/block.ts';
import { ChatsResponse } from '../../../types/types.ts';
import { MapStateToProps, connect } from '../../../utils/connect.ts';
import Item from '../item/index.ts';
import './list.css';

class ListItems extends Block {
    constructor(props: Record<string, unknown>) {
        super({
            ...props,
        });
    }

    componentDidUpdate(oldProps: { [x: string]: any }, newProps: { [x: string]: any }): boolean {
        if (oldProps.chats !== newProps.chats) {
            this.setProps({
                ListItems: newProps.chats?.map((chat: ChatsResponse) => new Item({ ...chat })) || [],
                showEmpty: !Array.isArray(newProps.chats) || newProps.chats.length
            });
            return true
        }
        return false
    }

    render(): string {
        return `
            <div class="chats">
                <div class="chats__inner">
                    ${!this.props.chats || this.props.chats.length === 0
            ? `<span>Нет чатов</span>`
            : `<div class="chatList">
                            <ul class="chatList__list">
                                {{{ListItems}}}
                            </ul>
                        </div>`
        }
                </div>
            </div>
        `;
    }
}

const mapStateToProps: MapStateToProps = ({ chats }) => ({ chats })

export default connect(mapStateToProps)(ListItems)
