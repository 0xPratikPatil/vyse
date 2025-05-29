import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Cookies Policy | Vyse',
  description: 'Learn how and why we use cookies on our website and services.',
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
        <p className="mb-4 text-sm text-foreground/70">Vyse uses cookies to enhance your writing experience and keep your account secure. This policy explains how and why we use cookies in our minimal, feature-rich online text editor.</p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">What Are Cookies?</h2>
          <p className="mb-4 text-sm">Cookies are small text files stored on your device to help us remember your preferences and keep you logged in.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Cookies</h2>
          <ul className="list-disc pl-6 mb-4 text-sm">
            <li>To keep you signed in</li>
            <li>To remember your preferences</li>
            <li>To improve Vyse and your minimal writing experience</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mt-8 mb-2">Managing Cookies</h2>
          <p className="mb-4 text-sm">You can control cookies through your browser settings. Disabling cookies may affect your experience with Vyse.</p>
        </section>

        <div className="mt-12 border-t border-border pt-6 text-sm text-foreground/70">
          <p>Last updated: May 29, 2025</p>
        </div>
      </div>
    </div>
  );
} 