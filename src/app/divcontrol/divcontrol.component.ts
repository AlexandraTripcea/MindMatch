import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RegisterComponent} from '../register';

@Component({
  selector: 'app-divcontrol',
  templateUrl: './divcontrol.component.html',
  styleUrls: ['./divcontrol.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DivcontrolComponent),
    multi: true
  }]
})
export class DivcontrolComponent implements ControlValueAccessor {
  counterValue: any;
  propagateChange = (a: any) => {
  };
  propagateTouch = (a: any) => {
  };


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.counterValue = obj;
    }
  }
}
