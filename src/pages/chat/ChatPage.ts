import Block from '../../utils/scripts/Block';
import template from './chat.hbs';
import { ChatList } from '../../blocks/chatList/ChatList';
import ChatsResponseDTO from '../../dto/ChatsResponseDTO';
import ChatMessageDTO from '../../dto/ChatMessageDTO';
import { messages } from '../../data/messages.json';
import { Message } from '../../blocks/message/Message';
import Input from '../../components/input/Input';

interface ChatPageProps {
  chats: ChatsResponseDTO[];
}

export default class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    super(props);
    this.props.isSelectChat = 0;
  }

  public setSelectChat(id: number):void {
    this.children.messages = messages
      .map((messageData: any) => new ChatMessageDTO(messageData))
      .map((message: ChatMessageDTO) => new Message({ message })).reverse();
    this.children.input = new Input({
      id: 'current-chat__input',
      type: 'string',
      name: 'message',
      inputClassName: 'current-chat__input',
      placeholder: 'Сообщение',
    });
    this.props.isSelectChat = id;
  }

  protected initChildren() {
    this.children.chatList = new ChatList({
      chats: this.props.chats,
      onclick: this.setSelectChat.bind(this),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
