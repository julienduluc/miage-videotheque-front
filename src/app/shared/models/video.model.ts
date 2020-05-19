import { SafeResourceUrl } from '@angular/platform-browser';

export class Video {

  id: number;
  key: string;
  name: string;
  type: string;
  safeUrl: SafeResourceUrl;


  constructor(obj?: Video) {
    if (obj) {
      this.id = obj.id;
      this.key = obj.key;
      this.name = obj.name;
      this.type = obj.type;
    }
  }
}
