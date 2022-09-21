import Link from 'next/link'

export default function Header() {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight pb-10 pt-20">
      <Link href="/">
        <a className="hover:underline">Blog</a>
      </Link>
      .
    </h2>
  )
}
