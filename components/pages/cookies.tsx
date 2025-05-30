import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Cookies Policy | Vyse",
  description: "Learn how and why we use cookies on our website and services.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold lg:text-5xl">Cookies Policy</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Learn how and why we use cookies on our website and services
        </p>
      </div>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            This Cookies Policy explains how Vyse ("we," "our," or "us") uses
            cookies and similar technologies on our website and text editor
            platform. This policy provides you with information about how we use
            these technologies, what types of cookies we use, the information we
            collect, how that information is used, and your options for
            controlling cookies.
          </p>
          <p className="mb-4">
            By using our website or services, you consent to the use of cookies
            as described in this policy. If you do not accept the use of
            cookies, you can disable them as explained below, but please note
            that doing so may affect your ability to use some features of our
            website and services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your device
            (computer, tablet, or mobile) when you visit websites. They are
            widely used to make websites work more efficiently, provide a better
            user experience, and give website owners information about how their
            sites are used.
          </p>
          <p className="mb-4">
            Cookies are not harmful and do not contain viruses. They cannot be
            used to extract personal information from your device that you have
            not already provided to the website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
          <p className="mb-4">
            We use the following types of cookies on our website and platform:
          </p>

          <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly.
            They enable core functionality such as security, authentication, and
            document saving. You cannot opt out of these cookies as the website
            cannot function properly without them.
          </p>

          <h3 className="text-xl font-semibold mb-2">Preference Cookies</h3>
          <p className="mb-4">
            These cookies enable our website to remember information that
            changes the way the website behaves or looks, such as your preferred
            theme (light/dark mode), editor settings, or language preferences.
            They help us provide a personalized experience.
          </p>

          <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
          <p className="mb-4">
            These cookies help us understand how visitors interact with our
            website and text editor by collecting and reporting information
            anonymously. They help us improve our platform by providing insights
            into feature usage and user behavior.
          </p>

          <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
          <p className="mb-4">
            These cookies collect information about how our text editor
            performs, including loading times, error rates, and feature usage.
            This helps us optimize the platform for better performance and user
            experience.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Specific Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="bg-blue-600/10">
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    Cookie Name
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    Purpose
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    Duration
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    __vyse_session
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Maintains your authenticated session on the platform
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Session
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Essential
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    __vyse_csrf
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Helps protect against Cross-Site Request Forgery attacks
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Session
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Essential
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    __vyse_preferences
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Stores user preferences such as theme, editor settings
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    1 Year
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Preference
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    __vyse_editor_state
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Preserves editor configuration and layout preferences
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    30 Days
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Preference
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    __vyse_analytics
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Tracks feature usage and platform performance (anonymized)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    90 Days
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    Analytics
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
          <p className="mb-4">
            We may use third-party services that place cookies on your device.
            These services include:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              <strong>Analytics Services:</strong> To understand how users
              interact with our platform
            </li>
            <li>
              <strong>Authentication Providers:</strong> For secure login and
              account management
            </li>
            <li>
              <strong>Content Delivery Networks:</strong> To optimize loading
              times and performance
            </li>
          </ul>
          <p className="mb-4">
            These third-party services have their own privacy policies and
            cookie practices, which we encourage you to review.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Managing Your Cookie Preferences
          </h2>
          <p className="mb-4">You have several options for managing cookies:</p>
          <ul className="list-disc pl-8 mb-6 space-y-1">
            <li>
              <strong>Browser Settings:</strong> Most browsers allow you to
              block or delete cookies through their settings
            </li>
            <li>
              <strong>Platform Settings:</strong> You can adjust cookie
              preferences within your Vyse account settings
            </li>
            <li>
              <strong>Opt-Out Tools:</strong> Use browser extensions or tools
              designed to manage tracking cookies
            </li>
          </ul>
          <p className="mb-4">
            Please note that disabling certain cookies may affect the
            functionality of our text editor and your overall experience.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Open Source Transparency</h2>
          <p className="mb-4">
            As an open-source project, our cookie implementation is transparent
            and can be reviewed in our public repository. You can examine
            exactly how cookies are used and contribute to improvements in our
            privacy practices.
          </p>
          <p className="mb-4">
            Visit our GitHub repository at{" "}
            <a
              href="https://github.com/0xpratikpatil/vyse"
              className="text-blue-600 hover:underline"
            >
              github.com/0xpratikpatil/vyse
            </a>{" "}
            to review our code and cookie implementation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookies Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify users of any material changes by
            posting the updated policy on our website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions about our use of cookies or this policy,
            please contact us:
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
