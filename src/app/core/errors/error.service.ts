import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  isErrorToDisplay(message: string) {
    let result = false;

    if (message
      && (!message.toLowerCase().includes('failed')
        && !message.toLowerCase().includes('error')
        && !message.toLowerCase().includes('exception')
        && !message.toLowerCase().includes('java')
        && !message.toLowerCase().includes('required')
        && !message.toLowerCase().includes('spring'))) {
      result = true;
    }

    return result;
  }
}
