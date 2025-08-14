import { TestBed } from '@angular/core/testing';
import { PostCategoryService } from './postcategory.service';

describe('PostService', () => {
  let service: PostCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
