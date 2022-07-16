import { ValidateType } from '../../components/input/Input';
import { MyEventTarget } from '../../typings/customEvents';

const validate = (target: MyEventTarget, type: ValidateType): void => {
  const { value } = target;
  let phoneValue: string;
  let isError: boolean;
  switch (type) {
    case ValidateType.LOGIN:
      if (value.length < 3 || value.length > 20) {
        isError = true;
        break;
      }
      isError = !/^[a-zA-Z\d_-][a-zA-Z]+[a-zA-Z\d_-]*$/.test(value);
      break;
    case ValidateType.PASS:
      if (value.length < 8 || value.length > 40) {
        isError = true;
        break;
      }
      isError = !/[A-Z]+/.test(value);
      break;
    case ValidateType.EMAIL:
      if (value.length < 5) {
        isError = true;
        break;
      }
      isError = !/^[a-zA-Z\d_-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value);
      break;
    case ValidateType.NAME:
      if (value.length < 1) {
        isError = true;
        break;
      }
      isError = !/^[A-ZА-Я]+[а-яА-ЯёЁa-zA-Z-]*$/.test(value);
      break;
    case ValidateType.PHONE:
      phoneValue = value.replace(/[^+\d]/g, '');
      if (phoneValue.length < 10 || phoneValue.length > 15) {
        isError = true;
        break;
      }
      isError = !/^[\d+]+\d*$/.test(phoneValue);
      break;
    default:
      isError = true;
      break;
  }

  if (isError) {
    target.parentNode.classList.add('error');
  } else {
    target.parentNode.classList.remove('error');
  }
};

export default validate;
