import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService } from '../order.service';
import Order from '../models/Order';
import { Router } from '@angular/router'
import Product from '../models/Product';
import { CommonModule } from '@angular/common';


interface Item {
  itemName: string;
  price: number;
  amount: number
}
@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit{
  constructor(private orderData: OrderService, private router: Router) {}

  largePies: Product[] = [];

  orderName: string = '';
  orderNumber: string = '';
  orderDate: string = '';
  orderTimeHour: string = '';
  orderTimeMinute: string = '';
  items: Item[] = [];


  flavors = [
    { id: 1, name: 'Cinnamon apple', price: 22, amount: 1},
    { id: 2, name: 'Triple berry', price: 22, amount: 1},
    { id: 3, name: 'Raspberry mango', price: 22, amount: 1}
  ]

  bigFlavors = [
    { id: 1, name: 'Chicken pot pie', price: 38, amount: 1},
    { id: 2, name: 'Steak and stout', price: 40, amount: 1},
    { id: 3, name: 'BIG apple', price: 38, amount: 1}
  ]

  itemForm: FormGroup = new FormGroup({
    largePie: new FormControl<string>(''),
    doublePie: new FormControl<string>(''),
    fourpackFlavor1: new FormControl<string>(''),
    fourpackFlavor2: new FormControl<string>(''),
    fourpackFlavor3: new FormControl<string>(''),
    fourpackFlavor4: new FormControl<string>(''),
  })

  ngOnInit(): void {
    this.orderData.currentOrder.subscribe((order: Order) => {
      this.orderName = order.orderName;
      this.orderNumber = order.orderNumber;
      this.orderDate = order.orderDate;
      this.orderTimeHour = order.orderTimeHour;
      this.orderTimeMinute = order.orderTimeMinute;
    })
    if (!this.orderName) {
      this.router.navigateByUrl('/neworder');
    }
    this.orderData.loadProducts().subscribe(response => {
      this.orderData.updateProductOptions(response)
    })
    this.orderData.productOptions.subscribe(productOptions => this.largePies = productOptions);


  }

  addLargePie(): void {

    const selectedFlavorId = this.itemForm.get('largePie')?.value;

    const selectedFlavor = this.largePies.find(flavor => flavor._id === selectedFlavorId);

    if (selectedFlavor) {
      const newItem: Item = {
        itemName: selectedFlavor.name,
        price: selectedFlavor.price,
        amount: 1
      };
      this.items.push(newItem);
    }

  }
  trackByFn(index: number, item: any): any {
    return item.id;
}


  onSubmit() {
    console.log(this.itemForm.controls['largePie'].value)
    console.log(this.itemForm.controls['doublePie'].value)
    console.log(`Fourpack: ${this.itemForm.controls['fourpackFlavor1']}, ${this.itemForm.controls['fourpackFlavor2']}, ${this.itemForm.controls['fourpackFlavor3']}, ${this.itemForm.controls['fourpackFlavor4']}`)
  }
}
