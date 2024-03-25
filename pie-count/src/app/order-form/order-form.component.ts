import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhoneFormControl } from './phone-form-control';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import Order from '../models/Order';



@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent{

  orderForm: FormGroup = new FormGroup({
    orderName: new FormControl<string>('', Validators.required),
    orderNumber: new PhoneFormControl('', [Validators.minLength(4)]),
    orderDate: new FormControl<string | null>(null, Validators.required),
    orderTimeHour: new FormControl<string | null>(null),
    orderTimeMinute: new FormControl<string>('00')
  })



  constructor(private router: Router, private orderData: OrderService) { }




  onSubmit() {
    if (this.orderForm.valid) {
      const order: Order = {
        orderName: this.orderForm.get('orderName')?.value,
        orderNumber: this.orderForm.get('orderNumber')?.value,
        orderDate: this.orderForm.get('orderDate')?.value,
        orderTimeHour: this.orderForm.get('orderTimeHour')?.value,
        orderTimeMinute: this.orderForm.get('orderTimeMinute')?.value
      };

    this.orderData.updateOrder(order);
    this.router.navigateByUrl('/additem');
    } else {
      // error handling
    }
  }

}
