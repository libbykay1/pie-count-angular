import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {

  orderForm: FormGroup = new FormGroup({
    orderName: new FormControl<string>('', Validators.required),
    orderNumber: new FormControl<string>('', [Validators.minLength(4), Validators.maxLength(10)]),
    orderDate: new FormControl<string | null>(null, Validators.required),
    orderTimeHour: new FormControl<string | null>(null),
    orderTimeMinute: new FormControl<string>('00')
  })

  onSubmit() {
    console.log(`Name: ${this.orderForm.controls['orderName'].value}`)
    console.log(`Number: ${this.orderForm.controls['orderNumber'].value}`)
    console.log(`Pickup: ${this.orderForm.controls['orderDate'].value} ${this.orderForm.controls['orderTimeHour'].value}${this.orderForm.controls['orderTimeMinute'].value}`)
  }

}
