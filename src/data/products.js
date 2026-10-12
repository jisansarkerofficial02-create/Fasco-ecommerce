import shopImage1 from '../assets/shop-1.svg'
import shopImage2 from '../assets/shop-2.svg'
import shopImage3 from '../assets/shop-3.png'
import shopImage4 from '../assets/shop-4.png'
import shopImage5 from '../assets/shop-5.png'
import shopImage6 from '../assets/shop-6.png'
import shopImage7 from '../assets/shop-7.png'
import shopImage8 from '../assets/shop-8.png'
import shopImage9 from '../assets/shop-9.png'

const products = [
  { id: 1, name: 'Rounded Red Hat', price: 8, image: shopImage1, colors: ['#f3cb24', '#111111'], sizes: ['S', 'M'], brand: 'Al Karam', collection: 'Best sellers' },
  { id: 2, name: 'Linen-blend Shirt', price: 17, image: shopImage2, colors: ['#a9cbd8', '#f5cbd5'], sizes: ['M', 'L'], brand: 'Mango', collection: 'New arrivals' },
  { id: 3, name: 'Long-sleeve Coat', price: 106, image: shopImage3, colors: ['#ddd8c7', '#c5dfc3'], sizes: ['S', 'L', 'XL'], brand: 'Zara', collection: 'Best sellers' },
  { id: 4, name: 'Boxy Denim Hat', price: 25, image: shopImage4, colors: ['#a9cbd8', '#003c62'], sizes: ['S', 'M', 'L'], brand: 'Levi’s', collection: 'New arrivals' },
  { id: 5, name: 'Linen Plain Top', price: 25, image: shopImage5, colors: ['#b7d9bc', '#222222'], sizes: ['M', 'L'], brand: 'Mango', collection: 'Accessories' },
  { id: 6, name: 'Oversized T-Shirt', price: 11, image: shopImage6, colors: ['#f2c8dc', '#cdb5cb', '#ffffff'], sizes: ['S', 'M', 'L', 'XL'], brand: 'Zara', collection: 'New arrivals' },
  { id: 7, name: 'Polarised Sunglasses', price: 18, image: shopImage7, colors: ['#222222', '#98755e'], sizes: ['S', 'M', 'L'], brand: 'Al Karam', collection: 'Accessories' },
  { id: 8, name: 'Rockstar Jacket', price: 22, image: shopImage8, colors: ['#ceb7c9', '#b4d6de'], sizes: ['M', 'L', 'XL'], brand: 'Levi’s', collection: 'Best sellers' },
  { id: 9, name: 'Dotted Black Dress', price: 20, image: shopImage9, colors: ['#063a5d', '#222222', '#b8cbd9'], sizes: ['S', 'M', 'L'], brand: 'Zara', collection: 'New arrivals' },
]

const productDetails = {
  1: { description: 'A statement accessory with a playful shape and an easy fit for everyday outfits.', colorNames: ['Yellow', 'Black'], compareAtPrice: 12, rating: 4.8, reviewCount: 12, stock: 7 },
  2: { description: 'A lightweight linen-blend shirt with a relaxed silhouette for everyday wear.', colorNames: ['Blue', 'Pink'], compareAtPrice: 24, rating: 4.7, reviewCount: 8, stock: 11 },
  3: { description: 'A versatile long-sleeve coat with a clean shape and a polished finish.', colorNames: ['Stone', 'Sage'], compareAtPrice: 132, rating: 4.9, reviewCount: 16, stock: 5 },
  4: { description: 'A denim-inspired wardrobe piece with a casual fit and easy-to-style colorways.', colorNames: ['Light blue', 'Navy'], compareAtPrice: 36, rating: 4.6, reviewCount: 9, stock: 8 },
  5: { description: 'A simple linen-look top designed to pair with your everyday essentials.', colorNames: ['Sage', 'Black'], compareAtPrice: 35, rating: 4.8, reviewCount: 6, stock: 10 },
  6: { description: 'A relaxed oversized tee with a bold look and a soft, easy-to-wear shape.', colorNames: ['Blush', 'Mauve', 'White'], compareAtPrice: 16, rating: 4.7, reviewCount: 14, stock: 4 },
  7: { description: 'Lightweight sunglasses with a timeless frame for bright days and everyday wear.', colorNames: ['Black', 'Brown'], compareAtPrice: 25, rating: 4.8, reviewCount: 11, stock: 13 },
  8: { description: 'A standout jacket with a confident denim look, made for layering through the season.', colorNames: ['Mauve', 'Blue'], compareAtPrice: 30, rating: 4.9, reviewCount: 18, stock: 6 },
  9: { description: 'A classic dotted dress with a graceful silhouette for day-to-evening styling.', colorNames: ['Navy', 'Black', 'Blue'], compareAtPrice: 28, rating: 4.8, reviewCount: 10, stock: 9 },
}

export default products.map((product) => ({ ...product, ...productDetails[product.id] }))
