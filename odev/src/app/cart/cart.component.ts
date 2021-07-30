import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from '../product/product';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[]=[];
cartTotal=0
  constructor(
    private cartService: CartService,
    private toastrService:ToastrService,
    ) {}

  ngOnInit(): void {
    this.getCart();
    this.cartItems.forEach(item=>{
      this.cartTotal += (item.quantity*item.product.productPrice)
    })
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
    this.toastrService.error(product.productName + " sepetten silindi.")
  }

  addToCart(product:Product){
    this.cartService.addToCart(product);
  }

  decreaseCart(product:Product){
    this.cartService.decreaseCart(product);
  }
}
