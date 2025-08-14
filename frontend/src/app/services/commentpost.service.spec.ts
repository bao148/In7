import { TestBed } from '@angular/core/testing';
import { CommentPostService } from './commentpost.service';

describe('PostService', () => {
  let service: CommentPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
