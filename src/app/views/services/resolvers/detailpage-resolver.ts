import { Injectable } from '@angular/core';
import {
	Resolve,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { NySellersService } from '../ny-sellers.service';
import { map } from 'rxjs/operators';

/**
 * Detail page resolver to get book details based on the isbn10 key as primary key
 *
 * @export
 * @class DetailPageResolver
 * @implements {Resolve}
 */
@Injectable()
export class DetailPageResolver implements Resolve<any> {
	constructor(
		private http: HttpClient,
		private nySellerService: NySellersService
	) { }

	resolve(
		route: ActivatedRouteSnapshot,
		rstate: RouterStateSnapshot
	): Observable<any> {
		let id = route.params['id']; // primary_isbn10 as key passed in url
		return this.http.get('assets/dummy_db/seller_list.json').pipe(
			map((data) => {
				return data['results']
					.filter(x => x.book_details[0].primary_isbn10.toString() === id.toString());
			})
		);
	}
}
