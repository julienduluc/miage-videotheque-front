export class Exemple {
  id: number;

  constructor(obj?: Exemple) {
    if (obj) {
      this.id = obj.id;
    }
  }
}
