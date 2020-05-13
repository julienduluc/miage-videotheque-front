export interface IAccount {
  avatar: any;
  id: number;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  username: string;
}

export class Account implements IAccount {

  avatar: any;
  id: number;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  username: string;

  constructor(private obj?: Account) {
    this.avatar = obj ? obj.avatar : null;
    this.id = obj ? obj.id : null;
    this.include_adult = obj ? obj.include_adult : null;
    this.iso_639_1 = obj ? obj.iso_639_1 : null;
    this.iso_3166_1 = obj ? obj.iso_3166_1 : null;
    this.name = obj ? obj.name : null;
    this.username = obj ? obj.username : null;
  }

}
