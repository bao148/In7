import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentpostComponent } from './commentpost.component';

describe('CommentpostComponent', () => {
  let component: CommentpostComponent;
  let fixture: ComponentFixture<CommentpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
