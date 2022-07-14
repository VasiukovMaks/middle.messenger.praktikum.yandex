import Block from '../../utils/scripts/Block';
import template from './chatList.hbs';
import Link from '../../components/link/Link';
import Input from '../../components/input/Input';
import ChatsResponseDTO from '../../dto/ChatsResponseDTO';
import { ChatListItemComponent } from '../chatListItem/ChatListItem';

export interface ChatListProps {
  chats: ChatsResponseDTO[];
  onclick: (id: number) => void;
}

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  protected initChildren() {
    this.children.link = new Link({
      href: '../profile/index.html',
      label: 'Профиль',
      className: 'chat-list__link',
    });

    this.children.input = new Input({
      id: 'chat-list-search',
      type: 'text',
      name: 'search',
      inputClassName: 'chat-list__input',
      placeholder: 'Поиск',
    });

    this.children.listItems = this.props.chats.map((chat: ChatsResponseDTO) => (
      new ChatListItemComponent({
        chat,
        onclick: this.props.onclick,
      })));
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
