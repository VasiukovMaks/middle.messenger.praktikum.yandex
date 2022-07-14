import Block from '../../utils/scripts/Block';
import template from './label.hbs';

export interface LabelProps {
  id: string;
  label?: string;
  labelClassName?: string;
}

export default class Label extends Block {
  constructor(props: LabelProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
