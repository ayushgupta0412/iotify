import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})

/**
 * Sevices to get seller details based on the selected seller and list of sellers
 *
 * @export
 * @class NySellersService
 * @implements {Resolve}
 */
export class NySellersService {
	constructor(private http: HttpClient, private router: Router) { }

  /**
	 * Service as call to get the sellers book details
	 * @method getSellerDetails()
	 * @param name
	 */
	getSellerDetails(name: string = ''): Observable<any> {
		return this.http.get('assets/dummy_db/seller_list.json').pipe(
			map((data) => {
				return data['results']
					.filter(x => x.list_name.toString() === name.toString());
			})
		);
	}

  /**
	 * Service as call to get the sellers list
	 * @method getSellerNames()
	 */
	getSellerNames(): Observable<any> {
		return this.http.get('assets/dummy_db/seller_name.json');
	}
}
