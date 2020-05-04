export class Film {
  id: number;
  name: string;

  constructor(obj?: Film) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
    }
  }
}
