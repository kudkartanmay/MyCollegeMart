package com.mycollegemart.backend.controller;

import com.mycollegemart.backend.model.Cart;
import com.mycollegemart.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        // In a real app, you would add logic to add a specific product to the cart
        return cartService.saveCart(cart);
    }
}