import Block from '../../utils/scripts/Block';
import template from './layout.hbs';

interface LayoutProps {
  body: any
}

export default class Layout extends Block<LayoutProps> {
  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
