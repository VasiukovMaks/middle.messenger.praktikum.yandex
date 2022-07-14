import Block from '../../utils/scripts/Block';
import template from './message.hbs';
import ChatMessageDTO from '../../dto/ChatMessageDTO';
import timeFormatting from '../../utils/scripts/timeFormatting';

export interface MessageProps {
  message: ChatMessageDTO,
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
    this.props.formattedTime = timeFormatting(props.message.time);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
