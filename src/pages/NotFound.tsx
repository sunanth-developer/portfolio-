import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <article className="flex min-h-svh flex-col justify-center px-5 md:px-10">
      <p className="eyebrow text-accent">404</p>
      <h1 className="display-title mt-6 text-6xl md:text-8xl">This layer does not exist.</h1>
      <Link to="/" className="mt-10 font-display text-xs tracking-[0.24em] uppercase">
        Return to index →
      </Link>
    </article>
  )
}
