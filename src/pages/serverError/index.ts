import Layout from '../../blocks/layout/Layout';
import renderDOM from '../../utils/scripts/renderDOM';
import ServerErrorPage from './ServerError';

document.addEventListener('DOMContentLoaded', () => {
  const layout = new Layout({
    body: new ServerErrorPage(),
  });

  renderDOM('#app', layout);
});
