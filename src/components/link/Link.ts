import Block from '../../utils/scripts/Block';
import template from './link.hbs';

export interface LinkProps {
  href: string;
  label: string;
  target?: string;
  className?: string;
  events?: {
    click?: (e: Event) => void
  }
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
