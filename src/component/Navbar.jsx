import { useState } from 'react'
import Button from './Button'
import navbaricon from '../assets/navbaricon.svg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
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
        <a href="#sign-in" className="hidden cursor-pointer whitespace-nowrap no-underline hover:text-black sm:inline">Sign in</a>
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
    </nav>
    </header>
  )
}

export default Navbar
