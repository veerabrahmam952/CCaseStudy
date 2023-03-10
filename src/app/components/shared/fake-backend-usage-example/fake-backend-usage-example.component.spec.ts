import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeBackendUsageExampleComponent } from './fake-backend-usage-example.component';

describe('FakeBackendUsageExampleComponent', () => {
  let component: FakeBackendUsageExampleComponent;
  let fixture: ComponentFixture<FakeBackendUsageExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeBackendUsageExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeBackendUsageExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
