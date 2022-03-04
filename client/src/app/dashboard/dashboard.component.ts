import { Component } from '@angular/core';
import { MenuItems } from "./../shared/menu-items/menu-items";
interface MENU {
	state: string;
	name: string;
	type: string;
	icon: string;
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	public MENU_ITEMS: MENU[] = [
		{ state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fa fa-plane' },
		{ state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
		{ state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
		{ state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
		{ state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
		{ state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fa fa-plane' },
		{ state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
		{ state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
		{ state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
		{ state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' }
	];

	constructor(public menu: MenuItems) {
		this.menu.setMenuItem(this.MENU_ITEMS)
	}


}
