export class posts {
  constructor(
    public url_img: string,
    public date_pub: Date,
    public date_sup: Date,
    public content: String,
    public id_user: number,
    public nbr_like: number,
    public id?: number
  ) {}
}
