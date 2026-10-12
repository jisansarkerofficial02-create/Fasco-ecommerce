import { useId, useState } from 'react'
import Button from './Button'

const Subscribe = ({
  title = 'Subscribe To Our Newsletter',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin',
  buttonText = 'Subscribe Now',
  placeholder = 'Enter your email address',
  leftImage = '',
  rightImage = '',
  leftImageAlt = '',
  rightImageAlt = '',
  sectionId = 'subscribe',
  onSubmit,
  className = '',
}) => {
  const emailId = useId()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const email = event.currentTarget.elements.email.value
    onSubmit?.(email, event)
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section id={sectionId} className={`container py-12 sm:py-16 lg:py-20 ${className}`} aria-labelledby={emailId}>
      <div className="relative mx-auto grid min-h-[350px] max-w-[1200px] grid-cols-1 items-center gap-6 lg:min-h-[500px] lg:grid-cols-[minmax(0,1fr)_minmax(400px,1.6fr)_minmax(0,1fr)] lg:gap-5">
        <div className="relative hidden h-full min-h-[350px] items-end justify-center lg:flex">
          {leftImage && <img src={leftImage} alt={leftImageAlt} className="h-full max-h-[470px] w-full object-contain object-bottom" />}
        </div>

        <div className="z-10 flex min-w-0 flex-col items-center justify-center text-center">
          <h2 id={emailId} className="text-3xl font-bold leading-tight text-[#484848] sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 max-w-[390px] text-xs leading-5 text-[#8A8A8A]">{description}</p>}
          <form onSubmit={handleSubmit} className="mt-6 w-full max-w-[400px]">
            <label htmlFor={`${emailId}-email`} className="sr-only">Email address</label>
            <input
              id={`${emailId}-email`}
              name="email"
              type="email"
              placeholder={placeholder}
              required
              className="h-14 w-full bg-white px-5 text-sm text-[#484848] shadow-[0_12px_30px_rgb(0_0_0_/_6%)] outline-none placeholder:text-[#8A8A8A] focus:ring-2 focus:ring-[#484848]/30"
            />
            <Button type="submit" className="mt-5 min-h-11 px-7">{buttonText}</Button>
          </form>
          {submitted && (
            <p role="status" className="mt-3 text-xs text-[#484848]">
              {onSubmit ? 'Thank you for subscribing!' : 'Thanks for your interest! Connect an onSubmit handler to save newsletter signups.'}
            </p>
          )}
        </div>

        <div className="relative hidden h-full min-h-[350px] items-end justify-center lg:flex">
          {rightImage && <img src={rightImage} alt={rightImageAlt} className="h-full max-h-[470px] w-full object-contain object-bottom" />}
        </div>
      </div>
    </section>
  )
}

export default Subscribe
