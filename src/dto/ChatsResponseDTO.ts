import UserResponseDTO from './UserResponse';

export default class ChatsResponseDTO {
  public id: number | null;

  public title: string | null;

  public avatar: string | null;

  public unread_count: number | null;

  public last_message: { user: UserResponseDTO, time: Date | null, content: string } | null;

  constructor(data: any = null) {
    this.id = data?.id || null;
    this.title = data?.title || null;
    this.avatar = data?.avatar || null;
    this.unread_count = data?.unread_count || null;
    this.last_message = {
      user: new UserResponseDTO(data?.last_message?.user),
      time: data?.last_message?.time ? new Date(data.last_message.time) : null,
      content: data?.last_message?.content,
    };
  }
}
