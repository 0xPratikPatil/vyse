import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Vyse',
  description: 'Please read these terms carefully before using the Vyse platform.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <p className="mb-4 text-sm text-foreground/70">Welcome to Vyse! These terms and conditions outline the rules and regulations for the use of Vyse's website and online text editor. By accessing this site, you accept these terms in full. Do not continue to use Vyse if you do not accept all of the terms and conditions stated on this page.</p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">1. Introduction</h2>
          <p className="mb-4 text-sm">Vyse is a minimal, feature-rich online text editor designed to make writing effortless. These terms govern your use of Vyse and its features for writers, students, developers, and note-takers.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">2. User Accounts</h2>
          <p className="mb-4 text-sm">To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account and password.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">3. Content Ownership</h2>
          <p className="mb-4 text-sm">You retain ownership of the content you create in Vyse. We do not claim any rights to your words, notes, or documents.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">4. Privacy</h2>
          <p className="mb-4 text-sm">Your privacy is important to us. Please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for details on how we handle your data.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">5. Acceptable Use</h2>
          <p className="mb-4 text-sm">Vyse is a space for creativity and productivity. Please do not use Vyse for any unlawful or harmful activities.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
          <p className="mb-4 text-sm">We may update these terms from time to time. Continued use of Vyse means you accept any changes.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact</h2>
          <p className="mb-4 text-sm">If you have any questions about these terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
        </section>

        <div className="mt-12 border-t border-border pt-6 text-sm text-foreground/70">
          <p>Last updated: May 29, 2025</p>
        </div>
      </div>
    </div>
  );
} 