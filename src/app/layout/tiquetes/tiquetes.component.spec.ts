import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiquetesComponent } from './tiquetes.component';

describe('TiquetesComponent', () => {
  let component: TiquetesComponent;
  let fixture: ComponentFixture<TiquetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiquetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
