/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { CreateAndPlaceOrderComponent } from './CreateAndPlaceOrder.component';
import {CreateAndPlaceOrderService} from './CreateAndPlaceOrder.service';

describe('CreateAndPlaceOrderComponent', () => {
  let component: CreateAndPlaceOrderComponent;
  let fixture: ComponentFixture<CreateAndPlaceOrderComponent>;

  let mockCreateAndPlaceOrderService;
  let mockDataService

  beforeEach(async(() => {

    mockCreateAndPlaceOrderService = sinon.createStubInstance(CreateAndPlaceOrderService);
    mockCreateAndPlaceOrderService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ CreateAndPlaceOrderComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: CreateAndPlaceOrderService, useValue: mockCreateAndPlaceOrderService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(CreateAndPlaceOrderComponent);
    component = fixture.componentInstance;

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

