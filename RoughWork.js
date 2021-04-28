//Shopping Cart JS

//**********************************************

// SHOPPING CART FUNCTIONS (Behind the scenes)

// cart : Array
// Item : Object/Class
// addItemToCart : Function
// removeItemFromCart : Function
// removeItemFromCartAll : Function
// clearCart : Function
// countCart : Function
// totalCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function

let shoppingCart = (function() {
  //Private methods and properties-----------------------
  let cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  loadCart();

  //Public methods and properties (anything attached to 'obj' will be public)--------
  let obj = {};

  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count += count;
        saveCart();
        return;
      }
    }

    console.log("addItemToCart:", name, price, count);

    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };

  // Set count from item
  obj.setCountForItem = function(name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
    saveCart();
  };

  // Remove item from cart
  obj.removeItemFromCart = function(name) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count--;
        if (cart[i].count === 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.countCart = function() {
    let totalCount = 0;
    for (let i in cart) {
      totalCount += cart[i].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function() {
    let totalCost = 0;
    for (let i in cart) {
      totalCost += cart[i].price * cart[i].count;
    }
    return Number(totalCost.toFixed(2));
  };

  //Total Cart Plus VAT
  obj.totalCartPlusVat = function() {
    let totalBeforeVAT = this.totalCart();
    let totalWithVAT;

    totalWithVAT = (totalBeforeVAT * 15) / 100 + totalBeforeVAT;
    totalWithVAT = totalWithVAT.toFixed(2);

    return totalWithVAT;
  };


  //Alternative where we have all the discount and delivery functions all appear in one object method 
  
  //Calculate final total
  obj.calculateFinalTotal = function() {

     let totalBeforeDiscount = this.totalCartPlusVat();
    totalBeforeDiscount = Number(totalBeforeDiscount);
    let totalDiscountAmount = 0;
    //let finalDiscount = calculateAmount(val);

    calculateAmount = function (val) {
      
      let discountValue = parseInt(val) / 100;

      totalDiscountAmount = discountValue * totalBeforeDiscount;
      totalDiscountAmount = parseInt(totalDiscountAmount);

      console.log(totalDiscountAmount);

      let displayDiscount = totalDiscountAmount.toFixed(2);
      document.getElementById("minus-discount").innerHTML = displayDiscount;

     return totalDiscountAmount;
    }

    let deliveryCharge =0;
    //let finalDeliveryCharge = addDeliveryCharge();
    
    addDeliveryCharge = function(cha) {
      
      deliveryCharge = parseInt(cha);
      
      console.log(deliveryCharge);
      let displayDelivery = deliveryCharge.toFixed(2);
      document.getElementById("added-shipping").innerHTML = displayDelivery;
      

      return deliveryCharge;
    };

    let totalPrice;
      
      let totalCartPlusVat = this.totalCartPlusVat();
      
    calculateGrandTotal = function() { 
    
    totalPrice = totalCartPlusVat - totalDiscountAmount + deliveryCharge;
    

   
    totalPrice = totalPrice.toFixed(2);
       console.log(totalPrice, totalCartPlusVat, totalDiscountAmount, deliveryCharge);

    //display result
    
     document.getElementById("final-total").innerHTML = totalPrice;
      
    // totalPurchaseAmount.style.display = "block";
    // totalPurchaseAmount.innerHTML = "Purchase Amount $" + totalPrice;
    console.log(totalPrice);
     
  };
     return;
  };

  //Generate Reference Number
  obj.generateReferenceNumber = function() {
    myReferenceCode = function() {
      let referenceNumber = (document.getElementById(
        "reference-number"
      ).innerHTML = Math.floor(Math.random() * 100000 + 1));
      console.log(referenceNumber);
    };
    return;
  };

  

  // List cart
  obj.listCart = function() {
    let cartCopy = [];
    console.log("Listing cart");
    console.log(cart);
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  //----------------
  return obj;
})();

/*function calculateGst(price, tax) {
  return (price * tax / 100) + price;
}*/

// Stuff I added and need to work on for the HyperionDev Task
/*
//calculate tax
function applyTax() {
  let salesTax = (shoppingCart.totalCart() / 100) * 5;
  $("#taxVAT").html(salesTax.toFixed(2));
}

//calculate Grand Total
function grandTotal() {
  let bigTotal = applyTax() + shoppingCart.totalCart();
  $("#grand-total").html(bigTotal.toFixed(2));
}
// Call the applyTax() when the window finishes loading...
window.onload = function () {
  applyTax();
  grandTotal();
};

//document
//.getElementsByClassNAme("btn-purchase")[0]
//.addEventListener("click", purchaseClicked);

// Info Bar Drop-down menu

$(function () {
  let Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    let links = this.el.find(".link");

    links.on(
      "click", {
        el: this.el,
        multiple: this.multiple
      },
      this.dropdown
    );
  };

  Accordion.prototype.dropdown = function (e) {
    let $el = e.data.el;
    ($this = $(this)), ($next = $this.next());

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      $el
        .find(".submenu")
        .not($next)
        .slideUp()
        .parent()
        .removeClass("open");
    }
  };

  let accordion = new Accordion($("#accordion"), false);
});

// Animate button (Home page mailing list form button)
//*$("#def").animateClick(function () {
 // $(this).css("color", "black");
//});

//fade in and out captions on Home Page
$("#button1").click(function () {
  $(".fadeOut").fadeOut(3000);
});

$("#button2").click(function () {
  $(".fadeIn").fadeIn(3000);
});

// chained effect to change the background on double clicks

$("body").dblclick(function () {
  $("body")
    .css("background-color", "tan")
    .css("background-color", "white");
});
*/

// Delivery option
//*$(document).ready(function() {
//  $(".delivery-select").materialSelect();
//});*/
