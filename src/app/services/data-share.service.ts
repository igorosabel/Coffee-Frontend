import { Injectable } from '@angular/core';

@Injectable()
export class DataShareService {
	globals = {};

	constructor() {}

	setGlobal(key: string, value: any) {
		this.globals[key] = value;
	}

	getGlobal(key:string) {
		if (this.globals[key]) {
			return this.globals[key];
		}
		return null;
	}

	removeGlobal(key:string) {
		if (this.globals[key]) {
			delete this.globals[key];
		}
	}

	resetGlobals() {
		this.globals = {};
	}
}