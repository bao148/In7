import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostCategoryComponent } from './admin-post-category.component';

describe('AdminPostCategoryComponent', () => {
  let component: AdminPostCategoryComponent;
  let fixture: ComponentFixture<AdminPostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPostCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
