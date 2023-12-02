var loadedProducts = {};
var cart = [];
var cartCounter = 0;

export function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    
    if (pageID == "cart") {

        $.get(`pages/${pageID}.html`, function (data) {
            $('#app').html(data);
            loadCart();
        })
        .fail(function () {
            alert("Error 404, page not found");
        });
    }
    else if (pageID != "" && pageID != "home")
    {
        $.get(`pages/${pageID}.html`, function (data) {
            $('#app').html(data);
        })
        .fail(function () {
            alert("Error 404, page not found");
        });
    }
    else
    {
        $.get(`pages/home.html`, function (data) {
            $('#app').html(data);
        })
        .fail(function () {
            alert("Error 404, page not found");
        });
        setTimeout(loadProducts, 100);
    }
}

export function getData() {
    $.get(`data/data.json`, function (data) {
        loadedProducts = data;
    })
    .fail(function(error) {
        alert("getData Error: ", error);
    })
}

function loadProducts() {
    $(".cardHolder").html("");
    $.each(loadedProducts.Products, (index, product) => {
        $(".cardHolder").append(
            `<div class="card">
            <div class="cardImg"><img src="images/${product.productImage}" alt="${product.productName}"></div>
            <h3>${product.productName}</h3>
            <h2>$${product.productPrice}</h2>
            <div data-index="${index}" class="buyNow">Buy Now</div>
        </div>`
        )
    })

    $(".buyNow").on("click", function() {
        let index = $(this).attr("data-index");
        moveToCart(index);
    })
}

function moveToCart(productIndex) {
    cart.push(loadedProducts.Products[productIndex]);
    cartCounter = cart.length;
    updateCartCounter();
}

export function updateCartCounter() {
    if (cartCounter > 0) {
        $(".cartCounter").html(`${cartCounter}`);
        $(".cartCounter").removeClass("hide");
    }
    else {
        $(".cartCounter").addClass("hide");
    }
}

function loadCart() {
    console.log(cart);
    $(".cartHolder").html("");
    if (cartCounter > 0)
    {
        $(".itemCounter").addClass("hide");
        $(".noItems").addClass("hide");

        $.each(cart, (index, cartItem) => {
            $(".cartHolder").append(
                `<div class="card">
                <div class="cardImg"><img src="images/${cartItem.productImage}" alt="${cartItem.productName}"></div>
                <h3>${cartItem.productName}</h3>
                <h2>$${cartItem.productPrice}</h2>
                <div data-index="${index}" class="removeItem">Remove Item</div>
                </div>`
            )
        })

        $(".removeItem").on("click", function () {
            let index = $(this).attr("data-index");
            removeItem(index);
        });
    }
    else
    {
        $(".itemCounter").removeClass("hide");
        $(".noItems").removeClass("hide");
    }
}

function removeItem(productIndex) {
    cart.splice(productIndex, 1);
    console.log(cart);
    cartCounter = cart.length;
    updateCartCounter();
    loadCart();
}