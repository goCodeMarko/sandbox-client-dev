import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBooksComponent } from './table-books.component';

describe('TableBooksComponent', () => {
  let component: TableBooksComponent;
  let fixture: ComponentFixture<TableBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
