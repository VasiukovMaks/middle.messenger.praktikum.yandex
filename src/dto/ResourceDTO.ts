export default class ResourceDTO {
  public id: number | null;

  public user_id: number | null;

  public path: string | null;

  public filename: string | null;

  public content_type: string | null;

  public content_size: number | null;

  public upload_date: Date | null;

  constructor(data: any = null) {
    this.id = data?.id || null;
    this.user_id = data?.user_id || null;
    this.path = data?.path || null;
    this.filename = data?.filename || null;
    this.content_type = data?.content_type || null;
    this.content_size = data?.content_size || null;
    this.upload_date = data ? new Date(data.upload_date) : null;
  }
}
