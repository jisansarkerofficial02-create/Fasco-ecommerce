import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import shopNav1 from '../../assets/shop-nav1.svg'
import shopNav2 from '../../assets/shop-nav2.svg'
import shopNav3 from '../../assets/shop-nav3.svg'
import shopNav4 from '../../assets/shop-nav4.svg'
import { useCart } from '../../context/CartContext'
import products from '../../data/products'

const ShopNavbar = ({ cartContainer = false }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const { setIsOpen, itemCount, wishlist } = useCart()
  const navigate = useNavigate()
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return query ? products.filter((product) => `${product.name} ${product.brand}`.toLowerCase().includes(query)).slice(0, 5) : []
  }, [searchQuery])

  const submitSearch = (event) => {
    event.preventDefault()
    if (searchResults[0]) {
      navigate(`/product/${searchResults[0].id}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="relative z-30 h-[76px] w-full border-b border-[#f2f2f2] bg-white md:h-[106px]">
      <div className={cartContainer ? 'mx-auto flex h-full w-full max-w-[900px] items-center justify-between gap-4 px-4 sm:px-6 md:gap-8' : 'mx-auto flex h-full w-full max-w-[800px] items-center justify-between gap-4 px-4 md:gap-8 md:px-0'}>
        <Link to="/" className="shrink-0 font-serif text-[1.8rem] font-bold leading-none tracking-[.015em] text-[#484848] no-underline md:text-[2.1rem]">FASCO</Link>
        <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="shop-navigation" onClick={() => setMenuOpen((open) => !open)} className="order-2 ml-auto flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded border border-[#dedede] bg-white md:hidden">
          <span className="h-0.5 w-[1.15rem] bg-[#333]" /><span className="h-0.5 w-[1.15rem] bg-[#333]" /><span className="h-0.5 w-[1.15rem] bg-[#333]" />
        </button>
        <nav id="shop-navigation" aria-label="Shop navigation" className={menuOpen ? "absolute left-4 right-4 top-full z-20 order-3 block border border-[#eee] bg-white px-4 py-3 shadow-xl md:absolute md:left-1/2 md:right-auto md:top-1/2 md:w-max md:-translate-x-1/2 md:-translate-y-1/2 md:border-0 md:bg-transparent md:p-0 md:shadow-none" : "hidden order-3 md:absolute md:left-1/2 md:top-1/2 md:block md:w-max md:-translate-x-1/2 md:-translate-y-1/2"}>
          <ul className="m-0 flex list-none flex-col items-stretch gap-1 p-0 text-[.9rem] text-[#4a4a4a] md:flex-row md:items-center md:gap-10 md:text-xs">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 text-inherit no-underline">Home</Link></li>
            <li><Link to="/shop" onClick={() => setMenuOpen(false)} className="relative block py-2 text-inherit no-underline md:after:absolute md:after:bottom-0 md:after:left-0 md:after:right-0 md:after:h-px md:after:bg-[#666]">Shop</Link></li>
            <li><a href="/shop#new-arrivals" onClick={() => setMenuOpen(false)} className="block py-2 text-inherit no-underline">Products</a></li>
          <li className="relative"><button type="button" aria-expanded={pagesOpen} onClick={() => setPagesOpen((open) => !open)} className="block w-full border-0 bg-transparent py-2 text-left font-[inherit] text-inherit md:w-auto">Pages <span aria-hidden="true">⌄</span></button>
            {pagesOpen && <div className="z-20 min-w-36 border-l border-[#eee] pl-3 md:absolute md:left-0 md:top-full md:border md:bg-white md:p-2 md:shadow-lg">
              <Link to="/cart" onClick={() => { setPagesOpen(false); setMenuOpen(false) }} className="block px-2 py-2 text-inherit no-underline hover:bg-[#f7f7f7]">Cart</Link>
              <Link to="/wishlist" onClick={() => { setPagesOpen(false); setMenuOpen(false) }} className="block px-2 py-2 text-inherit no-underline hover:bg-[#f7f7f7]">Wishlist</Link>
              <Link to="/compare" onClick={() => { setPagesOpen(false); setMenuOpen(false) }} className="block px-2 py-2 text-inherit no-underline hover:bg-[#f7f7f7]">Compare</Link>
            </div>}
          </li>
          </ul>
        </nav>
        <div className="order-1 ml-auto flex shrink-0 items-center gap-2.5 text-[#363636] md:order-none md:ml-auto md:gap-5">
          <button type="button" aria-label="Search products" aria-expanded={searchOpen} onClick={() => { setSearchOpen((open) => !open); setAccountOpen(false) }} className="grid h-5 w-4 place-items-center border-0 bg-transparent p-0">
            <img src={shopNav1} alt="" className="h-[18px] w-[18px] object-contain" />
          </button>
          <button type="button" aria-label="Account menu" aria-expanded={accountOpen} onClick={() => { setAccountOpen((open) => !open); setSearchOpen(false) }} className="grid h-5 w-4 place-items-center border-0 bg-transparent p-0">
            <img src={shopNav2} alt="" className="h-[18px] w-[18px] object-contain" />
          </button>
          <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved items`} className="relative grid h-5 w-4 place-items-center">
            <img src={shopNav3} alt="" className="h-[18px] w-[18px] object-contain" />
            {wishlist.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#c22] px-1 text-[9px] text-white">{wishlist.length}</span>}
          </Link>
          <button type="button" aria-label={`Open shopping cart, ${itemCount} items`} onClick={() => setIsOpen(true)} className="relative grid h-5 w-4 place-items-center border-0 bg-transparent p-0">
            <img src={shopNav4} alt="" className="h-[18px] w-[18px] object-contain" />
            {itemCount > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[9px] text-white">{itemCount}</span>}
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full z-30 border-b border-[#eee] bg-white px-4 py-4 shadow-lg sm:px-6">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-[700px] gap-2">
            <label htmlFor="shop-search" className="sr-only">Search products</label>
            <input id="shop-search" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search products or brands" className="h-11 min-w-0 flex-1 border border-[#ddd] px-3 text-sm outline-none focus:border-black" />
            <button type="submit" disabled={!searchResults.length} className="h-11 bg-black px-5 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40">Search</button>
          </form>
          {searchQuery.trim() && <div className="mx-auto mt-2 max-w-[700px]" role="listbox" aria-label="Search results">
            {searchResults.length ? searchResults.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} onClick={() => { setSearchOpen(false); setSearchQuery('') }} className="flex items-center gap-3 border-b border-[#f1f1f1] py-2 text-xs text-[#333] no-underline last:border-0">
                <img src={product.image} alt="" className="h-12 w-10 object-cover" />
                <span className="min-w-0 flex-1 truncate">{product.name}</span><span>${product.price.toFixed(2)}</span>
              </Link>
            )) : <p className="py-3 text-xs text-[#777]">No products found.</p>}
          </div>}
        </div>
      )}
      {accountOpen && (
        <div className="absolute right-4 top-full z-30 w-64 border border-[#eee] bg-white p-4 shadow-lg sm:right-[max(calc((100vw-900px)/2),1.5rem)]">
          <p className="font-serif text-base">Welcome to FASCO</p>
          <p className="mt-1 text-[11px] leading-5 text-[#777]">You are browsing as a guest.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="border border-[#ddd] px-2 py-2 text-center text-[10px] text-[#333] no-underline">Wishlist</Link>
            <Link to="/cart" onClick={() => setAccountOpen(false)} className="bg-black px-2 py-2 text-center text-[10px] text-white no-underline">My cart</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default ShopNavbar


