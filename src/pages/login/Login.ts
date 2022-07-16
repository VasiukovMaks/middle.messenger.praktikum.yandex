import Block from '../../utils/scripts/Block';
import template from './login.hbs';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import TextField, { TextFieldProps } from '../../components/textField/TextField';
import validate from '../../utils/scripts/validate';
import { MyEvent } from '../../typings/customEvents';

interface LoginPageProps {
  titleText: string;
  inputsData: TextFieldProps[];
}

export default class LoginPage extends Block<LoginPageProps> {
  private storeInputs: Record<string, string>;

  constructor(props: LoginPageProps) {
    super(props);
  }

  initChildren() {
    this.children.inputs = this.props.inputsData.map(({
      id, type, name, label, validateType,
    }: TextFieldProps) => new TextField({
      type,
      id,
      name,
      inputClassName: 'entry-form__input',
      label,
      labelClassName: 'entry-form__label',
      events: {
        change: (e: MyEvent) => this.setStoreInputs({ [name]: e.target.value }),
        focus: (e: MyEvent) => e.target && validate(e.target, validateType!),
        blur: (e: MyEvent) => e.target && validate(e.target, validateType!),
      },
    }));

    this.children.button = new Button({
      classes: 'entry-form__button',
      label: 'Авторизоваться',
      events: {
        click: this.handlerSubmit.bind(this),
      },
    });

    this.children.link = new Link({
      className: 'entry-form__link',
      href: '../signup/index.html',
      label: 'Нет аккаунта?',
    });
  }

  handlerSubmit(e: Event):void {
    e.preventDefault();

    if (
      !this.children.inputs
        .map((input: TextField) => input.validate())
        .some((flag: boolean) => !flag)
    ) {
      console.log(this.store);
    }
  }

  private setStoreInputs(payload: any) {
    this.storeInputs = { ...this.storeInputs, ...payload };
  }

  private get store() {
    return this.storeInputs;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
