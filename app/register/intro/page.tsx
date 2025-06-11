import Link from 'next/link'

export default function IntroForm() {
    return (
        <form>
            <input placeholder="Organisation name" />
            <input placeholder="Address" />
            <Link href="/register/final">Next</Link>
        </form>
    )
}
