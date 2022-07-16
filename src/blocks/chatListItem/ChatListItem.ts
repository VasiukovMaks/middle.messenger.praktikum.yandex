import Block from '../../utils/scripts/Block';
import template from './chatListItem.hbs';
import ChatsResponseDTO from '../../dto/ChatsResponseDTO';
import timeFormatting from '../../utils/scripts/timeFormatting';

export interface ChatListItemProps {
  chat: ChatsResponseDTO,
  onclick: (id: number) => void,
  events?: {
    click?: (id: EventTarget) => void
  }
}

export class ChatListItemComponent extends Block<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({ ...props, formattedTime: timeFormatting(props.chat.last_message?.time) });
    this.props.events = {
      click: (e: any) => {
        this.props.onclick(Number(e.currentTarget.getAttribute('data-id')));
      },
    };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
