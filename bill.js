// totay date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
document.getElementById("date").innerHTML = today;

// store product
var procode = document.getElementById("pcode");
var pcode = ["001", "002", "003", "004", "005"];
var pname = ["Soap", "Biscuts", "Brush", "MilkPOwedr", "Samahan"];
var uprice = [50, 100, 35, 240, 30];

var total = 0;

for (var i = 0; i < pcode.length; i++) {
    var option = document.createElement("OPTION"),
        txt = document.createTextNode(pcode[i]);
    option.appendChild(txt);
    option.setAttribute("value", pcode[i]);
    procode.insertBefore(option, procode.lastChild);
}

// shows item details in that field 

function myFunction() {
    var prcode = document.getElementById("pcode").value;
    for (var i = 0; i < pcode.length; i++) {
        if (pcode[i] === prcode) {
            var npname = pname[i];
            var nuprice = uprice[i];
            document.querySelector('#pname').value = npname;
            document.querySelector('#uprice').value = nuprice;
        }
    }
}

// Product Represent 
class Product {
    constructor(pcode, pname, uprice, quantity, subtotal) {
        this.pcode = pcode;
        this.pname = pname;
        this.uprice = uprice;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayProducts() {
        const products = Store.getProducts();

        products.forEach((product) => UI.addProductToBill(product));
    }

    static addProductToBill(product) {
        const list = document.querySelector('#bill-details');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${product.pcode}</td>
        <td>${product.pname}</td>
        <td>${product.uprice}</td>
        <td>${product.quantity}</td>
        <td>${product.subtotal}</td>
        <td><a href="#"
        class="btn btn-danger btn-sm delete">Del</a></td>
      `;

        list.appendChild(row);
    }

    static deleteProduct(el) {
        if (el.classList.contains('delete')) {
            const subtotal = el.parentElement.parentElement.childNodes[9].innerText;;
            total = total - subtotal;
            document.querySelector("#total").value = total;
            el.parentElement.parentElement.remove();

        }
    }

    static clearFields() {
        document.querySelector('#pcode').value = '';
        document.querySelector('#pname').value = '';
        document.querySelector('#uprice').value = '';
        document.querySelector('#qty').value = '';
        document.querySelector("#subtotal").value = '';
    }
}


// Store Class: Handles Storage
class Store {
    static getProducts() {
        let products;
        if (localStorage.getItem('product') === null) {
            products = [];
        } else {
            products = JSON.parse(localStorage.getItem('products'));
        }

        return products;
    }
    static addProduct(product) {
        const products = Store.getProducts();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

    }

    /*static removeProduct(pcode) {
        const Products = Store.getProduct();

        //Products.forEach((product, index) => {

        var product = Products.find(product => product.pcode === pcode);

        console.log(product.subtotal);

        product.splice(index, 1);

        //});
        localStorage.setItem('product', JSON.stringify(product));
    }*/

}

// Event: Display products
document.addEventListener('DOMContentLoaded', UI.displayProducts);

// Event: Add a product to bill
document.addEventListener("change", function() {

    // Get form values
    const pcode = document.querySelector('#pcode').value;
    const pname = document.querySelector('#pname').value;
    const uprice = document.querySelector('#uprice').value;
    const quantity = document.querySelector("#qty").value;
    const subtotal = uprice * quantity;
    total = total + subtotal;
    document.querySelector("#subtotal").value = subtotal;
    document.querySelector("#total").value = total;
    // Validate
    if (pname === '' || pcode === '' || uprice === '' || quantity === '') {} else {
        // Instatiate Product
        const product = new Product(pcode, pname, uprice, quantity, subtotal);
        // Add Product to UI
        UI.addProductToBill(product);

        // Add Product to store
        Store.addProduct(product);

        UI.clearFields();

    }
});

// Event : Remove a product
document.querySelector('#bill-details').addEventListener('click', (e) => {
    UI.deleteProduct(e.target)
});

//Balance culculate

payamount.oninput = function() {
    //const total = Document.querySelector('#total').value;
    //const payamount = Document.querySelector('#payamount').value;
    document.getElementById("balance").value = payamount.value - total;
}