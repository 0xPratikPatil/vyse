import React from "react";

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Security at Vyse</h2>
        <p className="mb-4">
          At Vyse, security is not just a feature—it's a core value. We
          understand the importance of protecting your documents, notes, and
          creative content, and we maintain the highest security standards to
          safeguard your data.
        </p>
        <p className="mb-4">
          Our platform is designed with security-first principles and undergoes
          rigorous security testing, including regular code reviews, security
          audits, and vulnerability assessments by our development team and
          external security experts.
        </p>
        <p className="mb-4">
          As an open-source project with global users, we comply with security
          and privacy regulations worldwide, including GDPR for European users,
          CCPA for California residents, and other applicable data protection
          frameworks.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Vulnerability Disclosure Program
        </h2>
        <p className="mb-4">
          We believe in the value of responsible security research and welcome
          the assistance of the security community in identifying potential
          vulnerabilities in our platform.
        </p>
        <h3 className="text-xl font-semibold mb-2">
          How to Report a Vulnerability
        </h3>
        <p className="mb-4">
          If you believe you have discovered a security vulnerability in our
          platform or website, we encourage you to notify us immediately. Please
          email our security team at{" "}
          <a
            href="mailto:security@vyse.app"
            className="text-blue-600 hover:underline"
          >
            security@vyse.app
          </a>{" "}
          with a detailed description of the issue.
        </p>
        <h3 className="text-xl font-semibold mb-2">
          What to Include in Your Report
        </h3>
        <ul className="list-disc pl-8 mb-6 space-y-1">
          <li>A detailed description of the vulnerability</li>
          <li>Steps to reproduce the issue</li>
          <li>Potential impact of the vulnerability</li>
          <li>Any supporting materials (screenshots, logs, etc.)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">What to Expect</h3>
        <p className="mb-4">
          Once we receive your report, our security team will:
        </p>
        <ul className="list-disc pl-8 mb-6 space-y-1">
          <li>Acknowledge receipt of your report within 24 hours</li>
          <li>
            Provide an initial assessment of the report within 3 business days
          </li>
          <li>Keep you informed about our progress resolving the issue</li>
          <li>
            Recognize your contribution if you wish (with your permission)
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Scope of Testing</h2>
        <p className="mb-4">
          Our vulnerability disclosure program covers our main platform at
          vyse.app and our project repository on GitHub.
        </p>
        <p className="mb-4">
          The following are expressly out of scope for security testing:
        </p>
        <ul className="list-disc pl-8 mb-6 space-y-1">
          <li>Denial of Service (DoS) attacks</li>
          <li>Social engineering attacks against our contributors</li>
          <li>Testing of third-party services that we integrate with</li>
          <li>Brute force attacks on user accounts</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Our Security Commitments</h2>
        <ul className="list-disc pl-8 mb-6 space-y-1">
          <li>All user data is encrypted both in transit and at rest</li>
          <li>Regular security audits and code reviews</li>
          <li>
            Password-protected document sharing with secure link generation
          </li>
          <li>Open-source transparency allowing community security review</li>
          <li>
            Compliance with major data protection regulations (GDPR, CCPA)
          </li>
          <li>Transparent security incident response process</li>
          <li>Regular security updates and patches for all systems</li>
          <li>Secure authentication and session management</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
        <p className="mb-4">
          We implement multiple layers of protection for your documents and
          personal information:
        </p>
        <ul className="list-disc pl-8 mb-6 space-y-1">
          <li>
            <strong>Encryption:</strong> All documents are encrypted using
            industry-standard AES-256 encryption
          </li>
          <li>
            <strong>Secure Sharing:</strong> Password-protected links with
            optional expiration dates
          </li>
          <li>
            <strong>Access Controls:</strong> Granular permissions for document
            sharing and collaboration
          </li>
          <li>
            <strong>Data Minimization:</strong> We only collect data necessary
            for platform functionality
          </li>
          <li>
            <strong>User Control:</strong> Easy export and deletion of your
            documents and account data
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Open Source Security</h2>
        <p className="mb-4">
          As an open-source project, Vyse benefits from community-driven
          security improvements:
        </p>
        <ul className="list-disc pl-8 mb-6 space-y-1">
          <li>Transparent codebase available for security review on GitHub</li>
          <li>Community contributions help identify and fix security issues</li>
          <li>Regular dependency updates and security patches</li>
          <li>Automated security scanning of our codebase</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="mb-4">
          For security inquiries, please contact our security team:
        </p>
        <p className="mb-4">
          Email:{" "}
          <a
            href="mailto:security@vyse.app"
            className="text-blue-600 hover:underline"
          >
            security@vyse.app
          </a>
        </p>
        <p className="mb-4">
          For emergency security issues requiring immediate attention, please
          include "URGENT" in the subject line.
        </p>
        <p className="mb-4">
          You can also report security issues through our GitHub repository at{" "}
          <a
            href="https://github.com/0xpratikpatil/vyse"
            className="text-blue-600 hover:underline"
          >
            github.com/0xpratikpatil/vyse
          </a>
        </p>
        <p className="mb-4">
          Project Maintainer:
          <br />
          @0xpratikpatil
          <br />
          Open Source Text Editor Project
        </p>
      </section>
    </div>
  );
}
