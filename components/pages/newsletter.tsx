"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Shield, FileText, Bell } from "lucide-react";

export default function NewsletterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: replace this with your backend API call
      console.log("Form submitted:", data);

      // reset form or show success
    } catch (error) {
      console.error("Newsletter signup failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <section className="mb-12 text-center">
        <p className="text-lg max-w-2xl mx-auto">
          Join thousands of security professionals who receive our newsletter
          with the latest in cybersecurity research, product updates, and
          industry insights delivered straight to your inbox.
        </p>
      </section>

      <section className="bg-background/70 backdrop-blur-sm border border-red-600/10 rounded-xl p-8 mb-16">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Your first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Your last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Newsletter Preferences</Label>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              {[
                { id: "productUpdates", label: "Product Updates & Features" },
                {
                  id: "securityResearch",
                  label: "Security Research & Advisories",
                },
                { id: "events", label: "Webinars & Events" },
                { id: "industryNews", label: "Industry News & Trends" },
              ].map((pref) => (
                <div key={pref.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id={pref.id}
                    name={pref.id}
                    className="mt-1"
                    defaultChecked
                  />
                  <Label htmlFor={pref.id} className="text-sm">
                    {pref.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              className="mt-1"
              required
              aria-describedby="consent-desc"
            />
            <label htmlFor="consent" className="text-sm">
              I agree to receive marketing communications from Vyse. You can
              unsubscribe at any time.
              <span id="consent-desc">
                {" "}
                For more information, read our{" "}
                <Link href="/privacy" className="text-red-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-medium mb-8 text-center">
          What You'll Receive
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Bell className="size-6 text-red-600" />,
              title: "Timely Updates",
              desc: "Be the first to know about new features, improvements, and updates to the Vyse platform.",
              label: "Timely Updates Icon",
            },
            {
              icon: <Shield className="size-6 text-red-600" />,
              title: "Security Advisories",
              desc: "Receive critical security advisories, vulnerability reports, and mitigation strategies.",
              label: "Security Advisories Icon",
            },
            {
              icon: <FileText className="size-6 text-red-600" />,
              title: "Research Insights",
              desc: "Access exclusive research papers, security trends, and analysis from our team of experts.",
              label: "Research Insights Icon",
            },
            {
              icon: <Mail className="size-6 text-red-600" />,
              title: "Community Content",
              desc: "Discover resources, best practices, and stories from the Vyse security community.",
              label: "Community Content Icon",
            },
          ].map(({ icon, title, desc, label }) => (
            <div key={title} className="flex gap-4 items-start">
              <div
                className="p-3 bg-red-600/10 rounded-full"
                aria-label={label}
              >
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-foreground/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
