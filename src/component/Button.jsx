const Button = ({ children = 'Sign Up', className = '', onClick, ...props }) => (
  <button
    type="button"
    onClick={onClick}
    {...props}
    className={`inline-flex min-h-9 min-w-24 cursor-pointer items-center justify-center rounded-[7px] border-0 bg-[#050505] px-5 text-xs leading-none text-white shadow-[0_3px_8px_rgb(0_0_0_/_22%)] transition duration-150 hover:bg-[#222] hover:shadow-[0_4px_10px_rgb(0_0_0_/_28%)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-neutral-600 ${className}`}
  >
    {children}
  </button>
)

export default Button
