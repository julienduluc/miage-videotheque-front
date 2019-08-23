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
 * Gère le timeout pour lancer un event permettant de rafraîchir
 * le tableau pour l'adapater à la taille de l'écran au moment
 * de l'ouverture/fermeture du panel des filtres
 */
  timeout(timeout: number) {
    setTimeout(() => {
      const event = document.createEvent('Event');
      event.initEvent('resize', false, true);
      window.dispatchEvent(event);
    }, timeout);
  }
}
