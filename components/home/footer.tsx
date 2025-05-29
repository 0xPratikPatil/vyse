import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { AnimatedGroup } from '../ui/animated-group'
import Logo from '@/components/logo.png'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-12 md:py-16 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.25,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Image src={Logo} alt="Vyse Logo" width={32} height={32} />
                <span className="text-lg font-semibold">Vyse</span>
              </Link>
              <p className="mb-6 text-sm text-foreground/70 max-w-sm">
                Vyse is a beautifully minimal, feature-rich online text editor designed to make writing effortless for everyone—writers, students, developers, and creatives.
              </p>
              <div className="flex items-center gap-4">
                {/* Social links can be added here if needed */}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#features" className="text-foreground/70 hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-foreground/70 hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Writing Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="group flex items-center gap-1 text-foreground/70">
                    <span className="hover:text-primary transition-colors">Blog</span>
                    <ExternalLink className="size-3 text-foreground/70 group-hover:text-primary transition-colors" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-foreground/70 hover:text-primary transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/tnc" className="text-foreground/70 hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedGroup>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-primary/10 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-foreground/70 md:mb-0">
            &copy; {new Date().getFullYear()} Vyse. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-foreground/70 text-sm">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="h-4 w-px bg-primary/20"></span>
            <Link href="/tnc" className="hover:text-primary transition-colors">Terms</Link>
            <span className="h-4 w-px bg-primary/20"></span>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
            <span className="h-4 w-px bg-primary/20"></span>
            <Link href="/security" className="hover:text-primary transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}