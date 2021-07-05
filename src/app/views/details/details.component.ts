import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

/**
 * Shows details of the Book and can add toreading queue.
 *
 * @export
 * @class DetailsComponent
 * @implements {OnInit}
 */
export class DetailsComponent implements OnInit {
	public bookDetails: any = [];
	constructor(
		private route: ActivatedRoute,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.route.data.subscribe((response) => {  // fetches resolver data as book details
			if (response['data'].length > 0) {
				this.bookDetails = response['data'][0];
			}
		});
	}


	/**
	 * Method to add books to queue and check if already added
	 * @method addToqueue()
	 */
	addToqueue() {
		let queue = JSON.parse(localStorage.getItem('queue')) || [], isbn10 = this.bookDetails.book_details[0]['primary_isbn10'].toString();
		let idx = queue.findIndex(x => x.book_details[0].primary_isbn10 == isbn10);
		if (idx == -1) { // check for new entry
			queue.push(this.bookDetails);
			localStorage.setItem('queue', JSON.stringify(queue));
			this.toastr.success('Book Added to Reading Queue!', 'Happy Reading!', { timeOut: 5000 });
		} else if (idx > -1) {  // check for existing entry
			this.toastr.warning('The Book Already in Queue!', 'Reading Queue', { timeOut: 5000 });
		} else {
			this.toastr.error('Something went wrong!', 'Reading Queue', { timeOut: 5000 });
		}
	}
}
