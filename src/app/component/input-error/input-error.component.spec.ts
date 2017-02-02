/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MsgErrorInputComponent } from './msg-error-input.component';

describe('MsgErrorInputComponent', () => {
  let component: MsgErrorInputComponent;
  let fixture: ComponentFixture<MsgErrorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgErrorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgErrorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
