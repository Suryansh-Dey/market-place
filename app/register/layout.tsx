'use client';
import { usePathname } from 'next/navigation';
import { JSX } from 'react/jsx-dev-runtime';

export default function ProgressBar({ children }: { children: JSX.Element }) {
    const pathname = usePathname()
    let step = 0;
    switch (pathname) {
        case "/register/intro":
            step = 1
            break
        case "/register/final":
            step = 2
            break
    }
    return (
        <div>
            Step {step}/2
            {children}
        </div>
    )
}

