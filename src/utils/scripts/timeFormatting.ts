const timeFormatting = (date: Date | null | undefined): string => {
  if (!date) return '';

  const yesterday = new Date(Date.now() - 86400000);
  const currentDate = new Date();

  if (yesterday.getDate() === date.getDate()) {
    return 'Вчера';
  }

  if (currentDate.getTime() - date.getTime() < 86400000) {
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  }

  if (currentDate.getTime() - date.getTime() < 604800000) {
    let weekDay: string;

    switch (date.getDay()) {
      case 0:
        weekDay = 'Пн';
        break;
      case 1:
        weekDay = 'Вт';
        break;
      case 2:
        weekDay = 'Ср';
        break;
      case 3:
        weekDay = 'Чт';
        break;
      case 4:
        weekDay = 'Пт';
        break;
      case 5:
        weekDay = 'Сб';
        break;
      default:
        weekDay = 'Вс';
    }

    return weekDay;
  }

  let month: string;

  switch (date.getMonth()) {
    case 0:
      month = 'Янв';
      break;
    case 1:
      month = 'Фев';
      break;
    case 2:
      month = 'Март';
      break;
    case 3:
      month = 'Апр';
      break;
    case 4:
      month = 'Май';
      break;
    case 5:
      month = 'Июнь';
      break;
    case 6:
      month = 'Июль';
      break;
    case 7:
      month = 'Авг';
      break;
    case 8:
      month = 'Сен';
      break;
    case 9:
      month = 'Окт';
      break;
    case 10:
      month = 'Нояб';
      break;
    default:
      month = 'Дек';
  }

  return `${date.getDate()} ${month} ${date.getFullYear()}`;
};

export default timeFormatting;
