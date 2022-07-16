import Layout from '../../blocks/layout/Layout';
import renderDOM from '../../utils/scripts/renderDOM';
import SignupPage from './Signup';
import { ValidateType } from '../../components/input/Input';

document.addEventListener('DOMContentLoaded', () => {
  const layout = new Layout({
    body: new SignupPage({
      titleText: 'Регистрация',
      inputsData: [
        {
          id: 'entry-form-email',
          type: 'text',
          name: 'email',
          label: 'Почта',
          validateType: ValidateType.EMAIL,
        },
        {
          id: 'entry-form-login',
          type: 'text',
          name: 'login',
          label: 'Логин',
          validateType: ValidateType.LOGIN,
        },
        {
          id: 'entry-form-first-name',
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          validateType: ValidateType.NAME,
        },
        {
          id: 'entry-form-second-name',
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          validateType: ValidateType.NAME,
        },
        {
          id: 'entry-form-phone',
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          validateType: ValidateType.PHONE,
        },
        {
          id: 'entry-form-password',
          type: 'password',
          name: 'password',
          label: 'Пароль',
          validateType: ValidateType.PASS,
        },
        {
          id: 'entry-form-password-repeat',
          type: 'password',
          name: 'password-repeat',
          label: 'Пароль (еще раз)',
          validateType: ValidateType.PASS,
        },
      ],
    }),
  });

  renderDOM('#app', layout);
});
