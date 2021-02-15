# Lendo Coding Challenge

This challenge was to build a shopping cart with the following specifications:

Create the following views/pages:

- A list view for products, which displays the name and pricing of the products.
  - The user should also be able to view the current number of items in the cart.
- A details view where a user can view product details and add the product to the cart. - Make sure a product cannot be added if it is unavailable. If a product has
  variants (colors, sizes, etc) the user should be able to select the variant they want
  before adding it to their cart. - The user should receive some visual feedback when adding a product.
- A checkout view where a user can see their cart before proceeding with payments. - The user should be able to increment and decrement the product quantity as well as remove the product completely.

Once done a user of your application should be able to:

1. Browse products in a list.
2. Add and remove a product to their shopping cart, as long as it is available.
3. Go back to products list view and keep browsing.
4. Add another product to their cart.
5. Go to checkout and view their cart.
6. Modify quantity and remove the product on the checkout page.

## Getting Started

- Please run the following command to start project: `yarn && yarn build && yarn start`
- To test, please run: `yarn test`

### About this App

This app is built in React with [Easy Peasy](https://easy-peasy.now.sh/) for state management. I used styled-components for CSS, to complement the component-based architecture. The setup is a basic webpack config file with babel and eslint rules. For testing, I used [@testing-library/react](https://testing-library.com/docs/) along with Jest due to it's seamlessness with Easy Peasy and to try something new.

# Notes

- The buttons are greyed out if the quantity is zero, item is unavailable, or you haven't selected the color
- For the cart, it only updates if a new item is added to the cart. You get the added to cart message when you add the same item twice, instead of updating cart number.
- When you add an item to the cart, it updates the id to be the `productId + color`, since there is no unique ID from database storage.
- Due to time constraints, the only option that is differentiated between in the cart is color.
- I do not pay attention to quantity for each color at this time. (I also didn't know how that pertains to the quantity per other options)
- The "Added to Cart!" toast doesn't blink in order to tell you how many times you pressed Add to Cart if you press quickly.

# Future to dos

- Decrement quantity in product details page per color as you add to cart
- Make cart sortable by other options in addition to color
- Upgrade UI elements
- Use toast for unavailable items and other messages, such as errors
- Add additonal tests for all actions in the store and listeners
- Add additional tests for decrementQuantity and removing item from cart
- Make the data uniformed (for example, color is both a string and array)
