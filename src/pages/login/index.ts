import Layout from '../../blocks/layout/Layout';
import renderDOM from '../../utils/scripts/renderDOM';
import LoginPage from './Login';
import { ValidateType } from '../../components/input/Input';

document.addEventListener('DOMContentLoaded', () => {
  const layout = new Layout({
    body: new LoginPage({
      titleText: 'Вход',
      inputsData: [
        {
          id: 'entry-form-login',
          type: 'text',
          name: 'login',
          label: 'Логин',
          validateType: ValidateType.LOGIN,
        },
        {
          id: 'entry-form-password',
          type: 'password',
          name: 'password',
          label: 'Пароль',
          validateType: ValidateType.PASS,
        },
      ],
    }),
  });

  renderDOM('#app', layout);
});
