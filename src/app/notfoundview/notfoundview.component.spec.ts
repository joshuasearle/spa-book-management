import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundviewComponent } from './notfoundview.component';

describe('NotfoundviewComponent', () => {
  let component: NotfoundviewComponent;
  let fixture: ComponentFixture<NotfoundviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotfoundviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
