import { TestBed } from '@angular/core/testing';
// import { PostService } from './post.service';
import { CategoryService } from './category.service';

describe('PostService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
