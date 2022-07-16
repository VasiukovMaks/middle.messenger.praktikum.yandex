import Block from '../../utils/scripts/Block';
import template from './message.hbs';
import ChatMessageDTO from '../../dto/ChatMessageDTO';
import timeFormatting from '../../utils/scripts/timeFormatting';

export interface MessageProps {
  message: ChatMessageDTO,
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props, formattedTime: timeFormatting(props.message.time) });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
