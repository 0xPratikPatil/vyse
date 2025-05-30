import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Vyse",
  description:
    "Please read these terms carefully before using the Vyse text editor platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold lg:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Please read these terms carefully before using the Vyse text editor
          platform.
        </p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Vyse ("we," "our," or "us"). These Terms of Service
            ("Terms") govern your access to and use of our online text editor
            platform, products, and services (collectively, the "Services").
          </p>
          <p className="mb-4">
            By accessing or using our Services, you agree to be bound by these
            Terms. If you are using our Services on behalf of an organization,
            you represent and warrant that you have the authority to bind that
            organization to these Terms. In such cases, "you" and "your" will
            refer to both you and that organization.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
          <p className="mb-4">
            Vyse is a beautifully minimal, feature-rich online text editor
            designed to make writing effortless. Our platform includes features
            for rich text formatting, image embedding, smart search and replace,
            task lists, tables, YouTube embeds, document sharing, and other
            writing-related activities.
          </p>
          <p className="mb-4">
            Our Services are designed to help writers, students, developers, and
            everyday note-takers focus on content creation in a clean,
            distraction-free environment. We continuously work to improve and
            expand our feature set to better serve our users' writing needs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
          <p className="mb-4">
            To access certain features of our Services, you may need to register
            for an account. You agree to provide accurate, current, and complete
            information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding your account credentials and
            for any activities or actions under your account. You agree to
            notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
          <p className="mb-4">When using our Services, you agree not to:</p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              Use the Services to create, store, or share content that is
              illegal, harmful, or violates others' rights
            </li>
            <li>
              Upload or embed content that infringes on intellectual property
              rights of others
            </li>
            <li>
              Use the Services to distribute spam, malware, or other malicious
              content
            </li>
            <li>
              Attempt to disrupt, compromise, or gain unauthorized access to our
              platform or other users' accounts
            </li>
            <li>Use the Services to harass, abuse, or harm other users</li>
            <li>
              Share your account credentials with unauthorized third parties
            </li>
            <li>
              Use the Services to process or store sensitive personal data
              without appropriate security measures
            </li>
            <li>
              Use automated tools to create accounts or generate content in
              violation of our platform policies
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Content and Data</h2>
          <p className="mb-4">
            You retain ownership of all content you create, upload, or store
            using our Services. By using our Services, you grant us a limited,
            non-exclusive license to host, store, and display your content
            solely for the purpose of providing our Services to you.
          </p>
          <p className="mb-4">
            You are responsible for backing up your content. While we make
            reasonable efforts to maintain data integrity, we recommend
            regularly exporting or backing up important documents.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            6. Intellectual Property Rights
          </h2>
          <p className="mb-4">
            Our Services and all related materials, including but not limited to
            software, images, text, graphics, logos, patents, trademarks,
            service marks, copyrights, photographs, audio, videos, and all
            intellectual property rights related thereto, are the exclusive
            property of Vyse or our licensors.
          </p>
          <p className="mb-4">
            Subject to your compliance with these Terms, we grant you a limited,
            non-exclusive, non-transferable, non-sublicensable license to access
            and use the Services for your personal or business writing purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">7. Open Source</h2>
          <p className="mb-4">
            Vyse is an open source project. While the platform service is
            governed by these Terms, the underlying source code is available
            under the terms of its respective open source license. Contributions
            to the project are welcome and encouraged.
          </p>
          <p className="mb-4">
            You may contribute to the Vyse project by reporting bugs, requesting
            features, submitting pull requests, or spreading the word about our
            platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">8. Privacy and Security</h2>
          <p className="mb-4">
            We take your privacy seriously. Our collection and use of personal
            information is governed by our Privacy Policy, which is incorporated
            into these Terms by reference.
          </p>
          <p className="mb-4">
            For documents shared with password protection, we implement security
            measures to protect your content. However, you should still exercise
            caution when sharing sensitive information.
          </p>
        </section>

        <div className="mt-12 border-t border-border pt-6 text-sm text-foreground/70">
          <p>Last updated: May 29, 2025</p>
          <p className="mt-2">
            Questions about these terms? Contact us at{" "}
            <a
              href="mailto:support@vyse.app"
              className="text-primary hover:underline"
            >
              support@vyse.app
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
