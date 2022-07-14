import Layout from '../../blocks/layout/Layout';
import renderDOM from '../../utils/scripts/renderDOM';
import NotFoundPage from './NotFound';

document.addEventListener('DOMContentLoaded', () => {
  const layout = new Layout({
    body: new NotFoundPage(),
  });

  renderDOM('#app', layout);
});
