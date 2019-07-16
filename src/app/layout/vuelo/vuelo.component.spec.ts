import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueloComponent } from './vuelo.component';

describe('UserComponent', () => {
  let component: VueloComponent;
  let fixture: ComponentFixture<VueloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
