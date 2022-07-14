import Block from '../../utils/scripts/Block';
import template from './button.hbs';

export interface ButtonProps {
  type?: string;
  classes?: string;
  label?: string;
  events?: {
    click?: (e: Event) => void
  }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
