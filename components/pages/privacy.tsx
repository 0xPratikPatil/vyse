import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Vyse",
  description: "Learn how Vyse collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold lg:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Learn how Vyse collects, uses, and protects your data.
        </p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            At Vyse ("we," "our," or "us"), we respect your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our online text editor platform, products,
            and services (collectively, the "Services").
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. By accessing or using our
            Services, you acknowledge that you have read, understood, and agree
            to be bound by this Privacy Policy. If you do not agree with our
            policies and practices, do not use our Services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect several types of information from and about users of our
            Services:
          </p>
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <p className="mb-2">Personal information may include:</p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>Contact information (such as name, email address)</li>
            <li>Account credentials and authentication information</li>
            <li>Profile information (display name, preferences)</li>
            <li>Communication preferences and settings</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">
            Document and Content Data
          </h3>
          <p className="mb-2">
            Information related to your use of our text editor:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              Document content, text, images, and media you create or upload
            </li>
            <li>Document metadata (creation date, modification history)</li>
            <li>Sharing settings and collaboration preferences</li>
            <li>Export and backup data</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
          <p className="mb-2">Information about how you use our Services:</p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              Log data (IP address, browser type, pages visited, time spent)
            </li>
            <li>Device information (hardware model, operating system)</li>
            <li>Feature usage patterns and editor interactions</li>
            <li>Performance data and error logs</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            How We Collect Information
          </h2>
          <p className="mb-4">
            We collect information through various channels:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              <strong>Direct Collection:</strong> Information you provide when
              registering, creating documents, or using our Services
            </li>
            <li>
              <strong>Automated Collection:</strong> Information collected
              automatically through cookies, server logs, and similar
              technologies
            </li>
            <li>
              <strong>Third-Party Services:</strong> Information we may receive
              from authentication providers or analytics services
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              Providing, maintaining, and improving our text editor Services
            </li>
            <li>Storing and syncing your documents across devices</li>
            <li>Enabling document sharing and collaboration features</li>
            <li>Understanding how users interact with our editor</li>
            <li>
              Communicating with you about our Services, updates, and new
              features
            </li>
            <li>Protecting our Services and users from security threats</li>
            <li>Complying with legal obligations</li>
            <li>Research and development to enhance our platform</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Document Ownership and Control
          </h2>
          <p className="mb-4">
            You retain full ownership and control over all documents and content
            you create using Vyse:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              Your documents and content remain your intellectual property
            </li>
            <li>
              You can export, download, or delete your documents at any time
            </li>
            <li>
              We do not use your document content for training AI models or
              other purposes
            </li>
            <li>
              Password-protected sharing gives you control over document access
            </li>
            <li>
              You can permanently delete your account and all associated data
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Data Sharing and Disclosure
          </h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties except in the following circumstances:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>With your explicit consent</li>
            <li>
              To provide Services you've requested (such as document sharing)
            </li>
            <li>To comply with legal obligations or court orders</li>
            <li>
              To protect our rights, property, or safety, or that of our users
            </li>
            <li>
              In connection with a business transaction (merger, acquisition,
              etc.)
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Compliance with Regional Data Protection Laws
          </h2>
          <p className="mb-4">
            We comply with various regional data protection laws, including but
            not limited to:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              <strong>General Data Protection Regulation (GDPR):</strong> For
              users in the European Economic Area, we provide rights to access,
              correct, delete, restrict processing, and port your data.
            </li>
            <li>
              <strong>California Consumer Privacy Act (CCPA):</strong> For
              California residents, we provide additional rights regarding
              personal information.
            </li>
            <li>
              <strong>Other Regional Laws:</strong> We adapt our practices to
              comply with applicable data protection regulations in other
              jurisdictions where our users are located.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Open Source and Transparency
          </h2>
          <p className="mb-4">
            As an open-source project, Vyse operates with transparency:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>Our code is publicly available for review on GitHub</li>
            <li>
              Privacy practices are documented and open to community scrutiny
            </li>
            <li>Data handling procedures are implemented transparently</li>
            <li>Community contributions help improve privacy and security</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
          <p className="mb-4">
            You have several rights regarding your personal information:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>Access and review your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Delete your account and associated data</li>
            <li>Export your documents and data</li>
            <li>Control document sharing and privacy settings</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <p className="mb-4">
            Email:{" "}
            <a
              href="mailto:privacy@vyse.app"
              className="text-blue-600 hover:underline"
            >
              privacy@vyse.app
            </a>
          </p>
          <p className="mb-4">
            GitHub:{" "}
            <a
              href="https://github.com/0xpratikpatil/vyse"
              className="text-blue-600 hover:underline"
            >
              github.com/0xpratikpatil/vyse
            </a>
          </p>
        </section>

        <div className="mt-12 border-t border-border pt-6 text-sm text-foreground/70">
          <p>Last updated: May 29, 2025</p>
        </div>
      </div>
    </div>
  );
}
