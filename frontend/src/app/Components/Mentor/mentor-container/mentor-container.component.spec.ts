import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorContainerComponent } from './mentor-container.component';

describe('MentorContainerComponent', () => {
  let component: MentorContainerComponent;
  let fixture: ComponentFixture<MentorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentorContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MentorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
