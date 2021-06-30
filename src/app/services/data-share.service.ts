import { Injectable } from '@angular/core';

@Injectable()
export class DataShareService {
	globals = {};

	constructor() {}

	setGlobal(key: string, value: any) {
		this.globals[key] = value;
		const obj = {
			key: key,
			type: typeof value,
			value: value
		};
		switch (obj.key) {
			case 'number':
			case 'boolean': { obj.value = value.toString(); }
			break;
			case 'object': { obj.value = JSON.stringify(value); }
			break;
		}
		localStorage.setItem(key, JSON.stringify(obj));
	}

	getGlobal(key:string) {
		if (this.globals[key]) {
			return this.globals[key];
		}
		const obj = JSON.parse(localStorage.getItem(key));
		if (!obj) {
			return null;
		}
		this.globals[key] = obj.value;
		return this.globals[key];
	}

	removeGlobal(key:string) {
		if (this.globals[key]) {
			delete this.globals[key];
		}
		localStorage.removeItem(key);
	}

	resetGlobals() {
		this.globals = {};
		localStorage.clear();
	}
}