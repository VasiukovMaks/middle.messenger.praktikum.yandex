export default class UserResponseDTO {
  public id: number | null;

  public first_name: string | null;

  public second_name: string | null;

  public display_name: string | null;

  public login: string | null;

  public email: string | null;

  public phone: string | null;

  public avatar: string | null;

  constructor(data: any = null) {
    this.id = data?.id || null;
    this.first_name = data?.first_name || null;
    this.second_name = data?.second_name || null;
    this.display_name = data?.display_name || null;
    this.login = data?.login || null;
    this.email = data?.email || null;
    this.phone = data?.phone || null;
    this.avatar = data?.avatar || null;
  }
}
