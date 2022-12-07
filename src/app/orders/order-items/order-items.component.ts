import { Component, OnInit, Inject } from '@angular/core';
 // import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})

export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    // tslint:disable-next-line:no-shadowed-variable
    private ItemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.ItemService.getItemList().subscribe(res => this.itemList = res as Item[]);

    if (this.data.orderItemIndex == null) {
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 1,
        Total: 0
      };
    } else {
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(event) {
    console.log(event);
    if (event.selectedIndex == 0) {
      this.formData.Price = 0;
      this.formData.ItemName = '';
      this.formData.Quantity = 1;
    } else {
      this.formData.Price = this.itemList[event.selectedIndex - 1].Price;
      this.formData.ItemName = this.itemList[event.selectedIndex -1].Name;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = this.formData.Quantity * this.formData.Price;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null){
        this.orderService.orderItems.push(form.value);
      } else {
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0) {
      this.isValid = false;
    } else if (formData.Quantity == 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
}
