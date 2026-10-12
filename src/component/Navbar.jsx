import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import navbaricon from '../assets/navbaricon.svg'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { itemCount, wishlist } = useCart()
  const links = [
    ['Home', '#home'],
    ['Deals', '#deals'],
    ['New Arrivals', '#new-arrivals'],
    ['Packages', '#packages'],
  ]

  return (
    <header className="w-full bg-white">
    <nav
      aria-label="Main navigation"
      className="container relative flex min-h-20 flex-wrap items-center justify-between gap-x-4 gap-y-4 py-4 lg:gap-x-8"
    >
      <a href="#home" className="shrink-0 cursor-pointer" aria-label="FASCO home">
        <img src={navbaricon} alt="FASCO" className="h-auto w-[132px] sm:w-[165px]" />
      </a>

      <ul className="hidden items-center gap-x-5 font-[Poppins,sans-serif] text-[11px] text-[#484848] lg:flex lg:gap-x-9">
        {links.map(([label, href]) => (
          <li key={href}><a href={href} className="cursor-pointer no-underline hover:text-black">{label}</a></li>
        ))}
      </ul>

      <div className="flex items-center gap-2 font-[Poppins,sans-serif] text-[11px] text-[#484848] sm:gap-4 lg:gap-8">
        <button type="button" aria-expanded={accountOpen} onClick={() => setAccountOpen((open) => !open)} className="hidden cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-inherit sm:inline">{accountOpen ? 'Close' : 'Sign in'}</button>
        <Button onClick={() => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' })}>Sign Up</Button>
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-md border border-[#e5e5e5] bg-white lg:hidden"
        >
          <span className={`h-0.5 w-5 bg-[#222] transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-[#222] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-[#222] transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <ul
          id="mobile-navigation"
          className="absolute left-4 right-4 top-full z-50 flex flex-col gap-1 rounded-lg border border-[#eee] bg-white p-3 font-[Poppins,sans-serif] text-sm text-[#484848] shadow-lg sm:left-6 sm:right-6 lg:hidden"
        >
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block cursor-pointer rounded-md px-3 py-2 hover:bg-[#f7f7f7] hover:text-black"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {accountOpen && (
        <div className="absolute right-4 top-full z-40 w-64 rounded border border-[#eee] bg-white p-4 text-left shadow-lg sm:right-6 lg:right-8">
          <p className="font-serif text-base text-[#222]">Guest account</p>
          <p className="mt-1 text-[11px] leading-5 text-[#777]">Sign-in is not connected yet. Your cart and saved items stay available on this device.</p>
          <div className="mt-3 flex justify-between gap-3 text-[11px]">
            <Link to="/cart" onClick={() => setAccountOpen(false)} className="text-[#333] underline">Cart ({itemCount})</Link>
            <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="text-[#333] underline">Wishlist ({wishlist.length})</Link>
          </div>
        </div>
      )}
    </nav>
    </header>
  )
}

export default Navbar
