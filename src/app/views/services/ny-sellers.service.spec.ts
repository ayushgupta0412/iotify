import { TestBed } from '@angular/core/testing';
import { NySellersService } from './ny-sellers.service';

describe('NySellersService', () => {
	let service: NySellersService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NySellersService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
