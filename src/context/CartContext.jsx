import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'fasco-mini-cart'
const WISHLIST_STORAGE_KEY = 'fasco-wishlist'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [compareIds, setCompareIds] = useState([])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const toggleFavorite = (productId) => setWishlist((current) => (
    current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]
  ))
  const toggleCompare = (productId) => setCompareIds((current) => (
    current.includes(productId)
      ? current.filter((id) => id !== productId)
      : current.length < 3 ? [...current, productId] : current
  ))

  const addItem = (product, size, color, colorName, quantity) => {
    const key = `${product.id}-${size}-${color}`
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.key === key)
      if (existing) {
        return currentItems.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
      }
      return [...currentItems, {
        key,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size,
        color,
        colorName,
        quantity,
      }]
    })
    setIsOpen(true)
  }

  const updateQuantity = (key, quantity) => {
    setItems((currentItems) => quantity < 1
      ? currentItems.filter((item) => item.key !== key)
      : currentItems.map((item) => item.key === key ? { ...item, quantity } : item))
  }

  const removeItem = (key) => setItems((currentItems) => currentItems.filter((item) => item.key !== key))
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const value = useMemo(() => ({ items, isOpen, setIsOpen, addItem, updateQuantity, removeItem, itemCount, subtotal, giftWrap, setGiftWrap, wishlist, toggleFavorite, compareIds, toggleCompare }), [items, isOpen, itemCount, subtotal, giftWrap, wishlist, compareIds])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
