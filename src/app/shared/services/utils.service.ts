import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  /**
   * Proper copy of an object
   */
  copyObject(object: any): any {
    let objectJson = null;

    if (object) {
      objectJson = JSON.stringify(object);
    }

    return JSON.parse(objectJson);
  }

  /**
   * Proper copy of a map
   * @param map
   */
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
   * Handle timeout to trigger an event allowing to refresh
   * an ngx-datatable to adapt it to the window size
  */
  timeout(timeout: number) {
    setTimeout(() => {
      const event = document.createEvent('Event');
      event.initEvent('resize', false, true);
      window.dispatchEvent(event);
    }, timeout);
  }

  /**
   * Transform blob to an usable image for the hmlt
   */
  createImageFromBlob(image: Blob, index: number): any {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      return reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}

