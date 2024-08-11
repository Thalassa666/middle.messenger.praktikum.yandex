import Block from '../../../helpers/block';
import { addUserToChat, deleteChat, deleteUserFromChat, loadChats } from '../../../services/Chats.service';
import { searchUsersByLogin } from '../../../services/Users.service';
import { ChatsResponse, CreateChatResponse, FindUserRequest, UserResponse } from '../../../types/types';
import { getModel } from '../../../utils/model';
import { MapStateToProps, connect } from '../../../utils/connect';
import ButtonAdd from '../../buttonAdd/index';
import ButtonDel from '../../buttonDel/index';
import ModalAdd from '../../modal/index';

type ChatsButtonsProps = {
    usersSearch: UserResponse[];
    activeChat: ChatsResponse | null;
    showModalAdd: boolean;
    showModalDelete: boolean;
    selectedUser: UserResponse;
}

class ChatsButtons extends Block<ChatsButtonsProps> {
    showModal: boolean

    constructor(props: ChatsButtonsProps) {
        super({
            ...props,
        })
        this.showModal = false
    }

    init() {
        const getUserInfo = async () => {
            if (this.props.activeChat !== null) await loadChats();
        };
        getUserInfo();

        const closeModal = (e: Event) => {
            e.stopPropagation()
            if (e.target === this.children.modalAddUser.getElement() || e.target === this.children.modalDeleteUser.getElement()) {
                this.setProps({ showModalAdd: false, showModalDelete: false })
            }
        }
        const closeModalBind = closeModal.bind(this)

        const searchUser = (e: Event) => {
            searchUsersByLogin(getModel(e) as FindUserRequest)
        }

        const addUser = async (e: Event) => {
            e.preventDefault()
            const model = getModel(e)
            const selectedUser = this.props.usersSearch.filter(i => i.login === model.login)[0] || {}
            this.setProps({
                selectedUser
            })
            if (this.props.selectedUser.id !== undefined) {
                const model = {
                    users: [
                        this.props.selectedUser?.id
                    ],
                    chatId: this.props.activeChat?.id
                }
                if(model.chatId !== undefined) {
                    await addUserToChat({
                        users: [
                            this.props.selectedUser?.id
                        ],
                        chatId: this.props.activeChat?.id || 0
                    })
                }
                this.setProps({ showModal: false })
            }

        }

        const deleteUser = async (e: Event) => {
            e.preventDefault()
            const model = getModel(e)
            const selectedUser = this.props.usersSearch.filter(i => i.login === model.login)[0] || {}
            this.setProps({
                selectedUser
            })
            if (this.props.selectedUser.id !== undefined) {
                const model = {
                    users: [
                        this.props.selectedUser?.id
                    ],
                    chatId: this.props.activeChat?.id
                }
                if(model.chatId !== undefined) {
                    await deleteUserFromChat({
                        users: [
                            this.props.selectedUser?.id
                        ],
                        chatId: this.props.activeChat?.id || 0
                    })
                }
                this.setProps({ showModal: false })
            }

        }

        const selectUser = (e: Event) => {
            const target = e.target as HTMLElement
            if (target.children.length === 0) {
                const value = target.innerText
                const modal = this.children.modalAddUser
                modal.children.input.setProps({
                    value
                })
            }

        }

        const deleteChatHandler = () => {
            if(this.props.activeChat !== null) {
                const model: CreateChatResponse = {chatId: this.props.activeChat.id}
                deleteChat(model)
            }
        }
        const deleteChatHandlerBind = deleteChatHandler.bind(this)

        const buttonAddUser = new ButtonAdd({
            title: 'Добавить пользователя',
            events: {
                click: [
                    () => {
                        this.setProps({ showModalAdd: true })
                    }
                ]
            }
        })

        const modalAddUser = new ModalAdd({
            title: 'Добавить пользователя',
            name: 'login',
            buttonText: 'Добавить',
            clickButton: addUser,
            changeInput: searchUser,
            listClick: selectUser,
            events: {
                click: [
                    closeModalBind
                ]
            },
        })

        const buttonDeleteUser = new ButtonDel({
            title: 'Удалить пользователя',
            events: {
                click: [
                    () => {
                        this.setProps({ showModalDelete: true })
                    }
                ]
            }
        })

        const modalDeleteUser = new ModalAdd({
            title: 'Удалить пользователя',
            name: 'login',
            clickButton: deleteUser,
            changeInput: searchUser,
            listClick: selectUser,
            events: {
                click: [
                    closeModalBind
                ]
            },
            buttonText: 'Удалить',
        })

        const buttonDeleteChat = new ButtonDel({
            title: 'Удалить чат',
            events: {
                click: [
                    deleteChatHandlerBind
                ]
            }
        })

        this.children = {
            ...this.children,
            buttonAddUser,
            buttonDeleteUser,
            modalAddUser,
            buttonDeleteChat,
            modalDeleteUser
        }
    }

    render(): string {
        return `
            <div class="chatsControlButtons {{className}}">
                {{{buttonAddUser}}}
                {{{buttonDeleteUser}}}
				{{{buttonDeleteChat}}}
                {{#if showModalAdd}}
                    {{{modalAddUser}}}
                {{/if}}
				{{#if showModalDelete}}
                    {{{modalDeleteUser}}}
                {{/if}}
            </div>
        `
    }
}

const mapStateToProps: MapStateToProps = ({ activeChat, usersSearch}) => ({ activeChat, usersSearch})

export default connect(mapStateToProps)(ChatsButtons)
