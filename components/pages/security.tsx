import React from 'react';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Security at Vyse</h1>
      <p className="mb-4 text-sm text-foreground/70">Vyse is committed to keeping your notes and data safe. We use industry-standard encryption and best practices to protect your privacy and your words.</p>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">How We Protect Your Data</h2>
        <ul className="list-disc pl-6 mb-4 text-sm">
          <li>All notes are encrypted in transit and at rest</li>
          <li>Access to your notes is protected by secure authentication</li>
          <li>We regularly review our security practices to keep your data safe</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Reporting Vulnerabilities</h2>
        <p className="mb-4 text-sm">If you discover a security issue, please <a href="/contact" className="text-primary hover:underline">contact us</a> or use our <a href="/security" className="text-primary hover:underline">vulnerability disclosure form</a>. We appreciate your help in keeping Vyse safe for everyone.</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Your Privacy</h2>
        <p className="mb-4 text-sm">Vyse puts privacy first. We never sell your data, and you control your notes at all times. For more details, see our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</p>
      </section>
    </div>
  );
} 