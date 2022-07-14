import template from './textField.hbs';
import Input, { ValidateType } from '../input/Input';
import Label from '../label/Label';
import Block from '../../utils/scripts/Block';

export interface TextFieldProps {
  id: string;
  type: string;
  name: string;
  inputClassName?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  validateType?: ValidateType;
  events?: Record<string, (e: Event) => void>
}

export default class TextField extends Block {
  constructor(props: TextFieldProps) {
    super(props);
  }

  initChildren() {
    this.children.labelNode = new Label({
      id: this.props.id,
      label: this.props.label,
      labelClassName: this.props.labelClassName,
    });

    this.children.inputNode = new Input({
      id: this.props.id,
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      events: this.props.events,
    });
  }

  public validate(): boolean {
    const { element } = this.children.inputNode;
    element.focus();
    element.blur();
    return !element.parentNode.classList.contains('error');
  }

  componentDidUpdate(oldProps: any, newProps: any): any {
    this.children.inputNode.setProps(newProps);
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
