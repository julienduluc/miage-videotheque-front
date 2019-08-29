import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  copyObject(object: any): any {
    let objectJson = null;

    if (object) {
      objectJson = JSON.stringify(object);
    }

    return JSON.parse(objectJson);
  }

  copyMap(map: Map<any, any>): Map<any, any> {
    const newMap = new Map();

    map.forEach((value, key) => {
      newMap.set(key, this.copyObject(value));
    });

    return newMap;
  }

  findValueInArray(array, value) {
    return array.find(
      (elt) => {
        return elt === value;
      }
    );
  }

  /**
 * Handle timeout to trigger an event allowing to refresheh
 * an ngx-datatable to adapt it to the window size
 */
  timeout(timeout: number) {
    setTimeout(() => {
      const event = document.createEvent('Event');
      event.initEvent('resize', false, true);
      window.dispatchEvent(event);
    }, timeout);
  }
}
