import renderDOM from './utils/scripts/renderDOM';
import Link from './components/link/Link';
import Layout from './blocks/layout/Layout';
import Block from './utils/scripts/Block';

document.addEventListener('DOMContentLoaded', () => {
  const linksData = [
    {
      href: '/pages/login/index.html',
      label: 'Login',
    },
    {
      href: '/pages/profile/index.html',
      label: 'Profile',
    },
    {
      href: '/pages/signup/index.html',
      label: 'Signup',
    },
    {
      href: '/pages/chat/index.html',
      label: 'Chat',
    },
    {
      href: '/pages/notFound/index.html',
      label: '404',
    },
    {
      href: '/pages/serverError/index.html',
      label: '500',
    },
  ];

  const links: Block[] = linksData.map((link: { href: string; label: string; }) => new Link({
    href: link.href,
    label: link.label,
  }));

  const layout = new Layout({
    body: links,
  });

  renderDOM('#app', layout);
});
