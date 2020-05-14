import { Injectable } from '@angular/core';

@Injectable()
export class ProfilService {

  private _activeTab: number;

  constructor() { }

  public get activeTab(): number {
    return this._activeTab;
  }
  public set activeTab(value: number) {
    this._activeTab = value;
  }


}
