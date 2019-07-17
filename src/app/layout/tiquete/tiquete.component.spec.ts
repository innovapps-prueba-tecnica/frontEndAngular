import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiqueteComponent } from './tiquete.component';

describe('TiqueteComponent', () => {
  let component: TiqueteComponent;
  let fixture: ComponentFixture<TiqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
