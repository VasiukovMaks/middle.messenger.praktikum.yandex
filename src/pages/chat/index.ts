import { chats } from '../../data/chat.json';
import Layout from '../../blocks/layout/Layout';
import renderDOM from '../../utils/scripts/renderDOM';
import ChatPage from './ChatPage';
import ChatsResponseDTO from '../../dto/ChatsResponseDTO';

document.addEventListener('DOMContentLoaded', () => {
  const layout = new Layout({
    body: new ChatPage({
      chats: chats.map((chatData: any) => new ChatsResponseDTO(chatData)),
    }),
  });

  renderDOM('#app', layout);
});
