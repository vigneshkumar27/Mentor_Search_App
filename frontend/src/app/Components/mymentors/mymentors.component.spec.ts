import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymentorsComponent } from './mymentors.component';

describe('MymentorsComponent', () => {
  let component: MymentorsComponent;
  let fixture: ComponentFixture<MymentorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymentorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MymentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
