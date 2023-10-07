const navbar = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    {
        name: 'Our Products',
        id: 'product',
        child: []
    },
    { name: 'Contact Us', id: 'contact' },
];

function createMenuItems(navbar) {
    return navbar.map(item => {
        if (item.child) {
            const subMenu = item.child.map(subItem => {
                return `<li><a href="#${subItem.id}">${subItem.name}</a></li>`;
            }).join('');

            return `
                <li>
                    <a href="#${item.id}">${item.name}</a>
                    <ul>${subMenu}</ul>
                </li>
            `;
        } else {
            return `<li><a href="#${item.id}">${item.name}</a></li>`;
        }
    }).join('');
}

const menuElement = document.getElementById('menu');

// Fetch the product categories from the first API
fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(categories => {
        // Update the "Our Products" submenu with the fetched categories
        const ourProductsMenuItem = navbar.find(item => item.id === 'product');
        ourProductsMenuItem.child = categories.map(category => ({
            name: category,
            id: category.toLowerCase()
        }));

        // Create the menu items with the updated navbar
        const menuHTML = createMenuItems(navbar);

        // Update the menu element with the new HTML
        menuElement.innerHTML = menuHTML;

        // Fetch products based on the selected category when a category link is clicked
        menuElement.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const categoryId = event.target.getAttribute('href').substring(1); // Remove the "#" symbol
                fetch(`https://fakestoreapi.com/products/category/${categoryId}`)
                    .then(response => response.json())
                    .then(products => {
                        // Display the products in your preferred way (e.g., render a list)
                        console.log(products);
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });
            }
        });
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
 
   
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function (e) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const number = document.getElementById("number").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !number || !message) {
            e.preventDefault();
            alert("Please fill out all required fields.");
        }
    });
