import navbarIcon from '../assets/navbaricon.svg'

const defaultLinks = [
  { label: 'Support Center', href: '#' },
  { label: 'Invoicing', href: '#' },
  { label: 'Contract', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'FAQs', href: '#' },
]

const Footer = ({
  links = defaultLinks,
  copyright = 'Copyright © 2022 Xpro . All Rights Reseved.',
  logo = navbarIcon,
  logoAlt = 'FASCO',
  logoHref = '#home',
  className = '',
}) => (
  <footer className={`w-full border-t border-[#E5E5E5] bg-white ${className}`}>
    <div className="container">
      <div className="flex min-h-[72px] flex-col items-center justify-between gap-5 py-5 sm:flex-row">
        <a href={logoHref} aria-label={`${logoAlt} home`} className="shrink-0 cursor-pointer">
          <img src={logo} alt={logoAlt} className="h-auto w-[120px]" />
        </a>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[11px] text-[#484848] sm:gap-x-6">
            {links.map(({ label, href }) => (
              <li key={`${label}-${href}`}>
                <a href={href} className="cursor-pointer whitespace-nowrap hover:text-black">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="pb-4 text-center text-[9px] text-[#484848]">{copyright}</p>
    </div>
  </footer>
)

export default Footer
