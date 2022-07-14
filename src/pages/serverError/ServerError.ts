import Block from '../../utils/scripts/Block';
import template from './serverError.hbs';
import Link from '../../components/link/Link';

export default class ServerErrorPage extends Block {
  constructor() {
    super();
  }

  initChildren() {
    this.children.link = new Link({
      label: 'Назад к чатам',
      href: '../chat/index.html',
      className: 'error__link',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
