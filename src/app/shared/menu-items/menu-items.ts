import { Injectable } from '@angular/core';

export interface MENU {
  main?: string;
  state: string;
  name: string;
  type: string;
  icon: string;
}

let MENU_ITEMS: MENU[] | undefined;

@Injectable()
export class MenuItems {
  getMenuitem() {
    return MENU_ITEMS;
  }

  setMenuItem(menu?: MENU[]) {
    MENU_ITEMS = menu;
  }
}
