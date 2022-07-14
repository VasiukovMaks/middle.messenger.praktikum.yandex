import Block from '../../utils/scripts/Block';
import template from './input.hbs';

export enum ValidateType {
  EMAIL = 'email',
  LOGIN = 'login',
  PASS = 'pass',
  NAME = 'name',
  PHONE = 'phone',
}

export interface InputProps {
  id: string;
  type: string;
  name: string;
  inputClassName?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  events?: Record<string, (e: Event) => void>
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
