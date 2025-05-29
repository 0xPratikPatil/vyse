import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Vyse',
  description: 'Learn how Vyse collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-sm text-foreground/70">Your privacy matters at Vyse. This policy explains how we collect, use, and protect your information when you use our minimal, feature-rich online text editor.</p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            At Vyse ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, products, and services (collectively, the "Services").
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, do not use our Services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">What We Collect</h2>
          <p className="mb-4">We collect several types of information from and about users of our Services:</p>
          <ul className="list-disc pl-6 mb-4 text-sm">
            <li>Account information (if you sign up)</li>
            <li>Your notes and documents (always private)</li>
            <li>Usage data (to improve Vyse)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Data</h2>
          <p className="mb-4">We use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 mb-4 text-sm">
            <li>To provide and improve Vyse</li>
            <li>To keep your notes secure, private, and accessible only to you</li>
            <li>To communicate updates and support</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 text-sm">
            <li>You can export or delete your notes at any time</li>
            <li>You can request deletion of your account</li>
            <li>We never sell your data</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="mb-4 text-sm">If you have questions about privacy at Vyse, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
        </section>

        <div className="mt-12 border-t border-border pt-6 text-sm text-foreground/70">
          <p>Last updated: May 29, 2025</p>
        </div>
      </div>
    </div>
  );
} 