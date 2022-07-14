import Block from '../../utils/scripts/Block';
import template from './profile.hbs';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';
import TextField, { TextFieldProps } from '../../components/textField/TextField';
import { MyEvent } from '../../typings/customEvents';
import validate from '../../utils/scripts/validate';

interface ProfilePageProps {
  inputsData: TextFieldProps[] | TextFieldProps;
}

export default class ProfilePage extends Block {
  private storeInputs: Record<string, string>;

  constructor(props: ProfilePageProps) {
    super(props);
    this.props.showSaveButton = false;
  }

  initChildren() {
    this.children.inputs = this.props.inputsData.map(({
      id, name, label, value, type, validateType,
    }: TextFieldProps) => new TextField({
      id,
      type,
      name,
      inputClassName: 'profile__input',
      label,
      value,
      validateType,
      disabled: true,
      events: {
        change: (e: MyEvent) => this.setStoreInputs({ [name]: e.target.value }),
        focus: (e: MyEvent) => e.target && validate(e.target, validateType!),
        blur: (e: MyEvent) => e.target && validate(e.target, validateType!),
      },
    }));

    this.children.button = new Button({});

    this.children.linkChangeData = new Link({
      className: 'profile__link',
      href: '/',
      label: 'Изменить данные',
      events: {
        click: this.enableInputs.bind(this),
      },
    });

    this.children.linkChangePass = new Link({
      className: 'profile__link', href: '/', label: 'Изменить пароль',
    });

    this.children.linkLogout = new Link({
      className: 'profile__link', href: '/', label: 'Выйти',
    });

    this.children.saveButton = new Button({
      classes: 'profile__button_save',
      label: 'Сохранить',
      events: {
        click: this.handlerSubmit.bind(this),
      },
    });
  }

  private enableInputs(e: MyEvent) {
    e.preventDefault();
    this.children.inputs.map((input: TextField) => input.setProps({ disabled: false }));
    this.props.showSaveButton = true;
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

  private get store() {
    return this.storeInputs;
  }

  private setStoreInputs(payload: any) {
    this.storeInputs = { ...this.storeInputs, ...payload };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
