import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NySellersService } from '../services/ny-sellers.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

/**
 * Home component as landing page of the application with list of sellers and books grid
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
export class HomeComponent implements OnInit {
	public nameList: any = [];
	public booksList: any = [];
	public activeName: any = [];
	public updatedOn: string = '';
	constructor(
		private toastr: ToastrService,
		private route: ActivatedRoute,
		private nySeller: NySellersService
	) { }

	ngOnInit(): void { this.getRouteData(); }

	/**
	 * Method to fetch route resolver data
	 * @method getRouteData()
	 */
	getRouteData() {
		this.route.data.subscribe((response) => {
			if (response['data'].results.length > 0) {
				this.nameList = response['data']['results'];
			}
		});
	}

	/**
	 * Method to filter data with get request call from service getSellerDetails against seller name and set updated status
	 * @method filterList()
	 * @param sellerName
	 * @param newest_published_date
	 */
	filterList(sellerName: string = 'Hardcover Graphic Books', newest_published_date) {
		this.nySeller.getSellerDetails(sellerName)
			.subscribe(
				(response) => {
					this.booksList = response;
					this.updatedOn = this.calcDate(new Date(newest_published_date)); // set updated status based on newest published date
				},
				(error) => {
					console.log('getSellerDetails error', error);
				}
			);
	}

	/**
	 * Method to calculate date difference from curent date and newest published date
	 * to get days, months or years ago updation period
	 * @method calcDate()
	 * @param date1 current date
	 * @param date2 newest published date
	 */
	calcDate(date2, date1 = new Date()) {
		let diff = Math.floor(date1.getTime() - date2.getTime());
		let day = 1000 * 60 * 60 * 24;

		let days = Math.floor(diff / day);
		let months = Math.floor(days / 31);
		let years = Math.floor(months / 12);

		let message = date2.toDateString();
		if (days <= 31) {
			message = days + " days "
		} else if (months <= 12) {
			message = months + " months "
		} else {
			message = years + " years ago "
		}
		return message
	}
}
