import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {

  flavors = [
    { id: 1, name: 'Cinnamon apple'},
    { id: 2, name: 'Triple berry'},
    { id: 3, name: 'Raspberry mango'}
  ]

  bigFlavors = [
    { id: 1, name: 'Chicken pot pie'},
    { id: 2, name: 'Steak and stour'},
    { id: 3, name: 'BIG apple'}
  ]

  itemForm: FormGroup = new FormGroup({
    largePie: new FormControl<string>(''),
    doublePie: new FormControl<string>(''),
    fourpackFlavor1: new FormControl<string>(''),
    fourpackFlavor2: new FormControl<string>(''),
    fourpackFlavor3: new FormControl<string>(''),
    fourpackFlavor4: new FormControl<string>(''),
  })

  onSubmit() {
    console.log(this.itemForm.controls['largePie'].value)
    console.log(this.itemForm.controls['doublePie'].value)
    console.log(`Fourpack: ${this.itemForm.controls['fourpackFlavor1']}, ${this.itemForm.controls['fourpackFlavor2']}, ${this.itemForm.controls['fourpackFlavor3']}, ${this.itemForm.controls['fourpackFlavor4']}`)
  }
}
