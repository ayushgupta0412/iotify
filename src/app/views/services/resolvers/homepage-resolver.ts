import { Injectable } from '@angular/core';
import {
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { NySellersService } from '../ny-sellers.service';

/**
 * Search Resolver to get the list of sellers names
 *
 * @export
 * @class HomepageResolver
 * @implements {Resolve}
 */
@Injectable()
export class HomepageResolver implements Resolve<any> {
	constructor(
		private http: HttpClient,
		private nySellerService: NySellersService
	) { }

	resolve(
		route: ActivatedRouteSnapshot,
		rstate: RouterStateSnapshot
	): Observable<any> {
		return this.nySellerService.getSellerNames().pipe(); //service call for seller name
	}
}
