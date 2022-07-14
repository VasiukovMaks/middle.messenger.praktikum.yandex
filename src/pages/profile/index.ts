import Layout from '../../blocks/layout/Layout';
import renderDOM from '../../utils/scripts/renderDOM';
import ProfilePage from './Profile';
import { ValidateType } from '../../components/input/Input';

document.addEventListener('DOMContentLoaded', () => {
  const layout = new Layout({
    body: new ProfilePage({
      inputsData: [
        {
          id: 'profile-email',
          name: 'email',
          label: 'Почта',
          value: 'pochta@yandex.ru',
          type: 'text',
          validateType: ValidateType.EMAIL,
        },
        {
          id: 'profile-login',
          name: 'login',
          label: 'Логин',
          value: 'ivanivanov',
          type: 'text',
          validateType: ValidateType.LOGIN,
        },
        {
          id: 'profile-first_name',
          name: 'first_name',
          label: 'Имя',
          value: 'Иван',
          type: 'text',
          validateType: ValidateType.NAME,
        },
        {
          id: 'profile-second_name',
          name: 'second_name',
          label: 'Фамилия',
          value: 'Иванов',
          type: 'text',
          validateType: ValidateType.NAME,
        },
        {
          id: 'profile-name',
          name: 'name',
          label: 'Имя в чате',
          value: 'Иван',
          type: 'text',
          validateType: ValidateType.NAME,
        },
        {
          id: 'profile-phone',
          name: 'phone',
          label: 'Телефон',
          value: '+7 (909) 967 30 30',
          type: 'text',
          validateType: ValidateType.PHONE,
        },
      ],
    }),
  });

  renderDOM('#app', layout);
});
