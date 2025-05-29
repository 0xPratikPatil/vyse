'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsSection() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What is Vyse?',
            answer: 'Vyse is a beautifully minimal, feature-rich online text editor designed to make writing effortless for everyone—writers, students, developers, and creatives.',
        },
        {
            id: 'item-2',
            question: 'Is Vyse free to use?',
            answer: 'Vyse offers a generous free tier for all users. Premium features and storage options are available for power users.',
        },
        {
            id: 'item-3',
            question: 'How do I share my notes or documents?',
            answer: 'You can share your notes with a secure link. For private notes, enable password protection before sharing.',
        },
        {
            id: 'item-4',
            question: 'Is my data private and secure?',
            answer: 'Absolutely. Your notes are private by default, and you control who can access them. We use encryption and never sell your data.',
        },
        {
            id: 'item-5',
            question: 'Can I use Vyse for code or documentation?',
            answer: 'Yes! Vyse supports code blocks, tables, and rich formatting—perfect for documentation, technical notes, and more.',
        },
        {
            id: 'item-6',
            question: 'How do I add images or embed YouTube videos?',
            answer: 'Simply drag and drop images into the editor, or paste a YouTube link to embed videos instantly.',
        },
        {
            id: 'item-7',
            question: 'How do I contact support?',
            answer: 'Reach out to us anytime at support@vyse.app or use the in-app help menu.',
        },
    ]

    return (
        <section className="py-16 md:py-24" id="faq">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Quick answers about Vyse, privacy, sharing, and more.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can't find what you're looking for? Email us at{' '}
                        <Link
                            href="mailto:support@vyse.app"
                            className="text-primary font-medium hover:underline">
                            support@vyse.app
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
