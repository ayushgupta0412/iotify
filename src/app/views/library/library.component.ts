import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NySellersService } from '../services/ny-sellers.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

/**
 * Libray component to list reading queue books list
 *
 * @export
 * @class LibraryComponent
 * @implements {OnInit}
 */
export class LibraryComponent implements OnInit {
  public nameList: any = [];
  public booksList: any = [];
  public tempBooksList: any = [];
  public activeName: any = [];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private nySeller: NySellersService
  ) { }

  ngOnInit(): void {
    let queue = JSON.parse(localStorage.getItem('queue')) || [];
    this.booksList = this.tempBooksList = queue;
    this.getRouteData();
  }

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
   */
  filterList(sellerName: string = 'Hardcover Graphic Books') {
    if (sellerName == 'clear_filter') {
      this.booksList = this.tempBooksList;
    } else {
      this.booksList = this.tempBooksList.filter(x => x.list_name.toString() === sellerName.toString())
    }
  }

  /**
   * Method to remove books from queue
   * @method filterList()
   * @param queueBook
   */
  removeQueue(queueBook: any = []) {
    if (queueBook) {
      let queue = JSON.parse(localStorage.getItem('queue')) || [];
      let idx = queue.findIndex((x, i) => x.book_details[0].primary_isbn10 == queueBook.book_details[0]['primary_isbn10'].toString());
      if (idx > -1) { // check for book is exists remove
        (idx != 0) ? queue.splice(0, idx) : queue.splice(0);
        this.booksList = this.tempBooksList = queue;
        localStorage.setItem('queue', JSON.stringify(queue));
        this.toastr.success('Book Removed from Queue!', 'Happy Reading!', { timeOut: 5000 });
      } else if (idx == -1) { // check for book is doesn't exists
        this.toastr.warning('The Book Doesn\'t Exists in Queue!', 'Reading Queue', { timeOut: 5000 });
      } else {
        this.toastr.error('Something went wrong!', 'Reading Queue', { timeOut: 5000 });
      }
    }
  }
}
