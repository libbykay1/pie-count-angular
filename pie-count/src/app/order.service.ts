import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import Order from "./models/Order";
import Product from "./models/Product";


@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(private http: HttpClient) {}

    private orderSource = new BehaviorSubject<Order>({
        orderName: '',
        orderNumber: '',
        orderDate: '',
        orderTimeHour: '',
        orderTimeMinute: ''
    });
    currentOrder = this.orderSource.asObservable();

    private productOptionsSource = new BehaviorSubject<Product[]>([]);
    productOptions = this.productOptionsSource.asObservable();

    updateOrder(order: Order) {
        this.orderSource.next(order);
    }

    updateProductOptions(products: Product[]) {
        this.productOptionsSource.next(products);
    }

    loadProducts() {
        return this.http.get<Product[]>('http://localhost:8080/large');
    }

    createOrder(order:Order) {
        return this.http.post<Order>('http://localhost:8080/orders', order)
    }
}
