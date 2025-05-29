import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, MessageCircle, Users, Github } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
              Get in Touch
            </h2>
            <p className="text-sm md:text-base text-foreground/70">
              Have questions about Vyse? Want to learn more about our text
              editor, suggest features, or report bugs? We'd love to hear from
              you.
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Organization (Optional)</Label>
              <Input id="company" placeholder="Your company or school" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiryType">How can we help?</Label>
              <select
                id="inquiryType"
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
              >
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="support">General Support</option>
                <option value="contribution">Contributing to Vyse</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your question, feedback, or idea..."
                rows={4}
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full text-white">
              Send Message
            </Button>

            <p className="text-xs text-foreground/60 mt-2">
              By submitting this form, you agree to our{" "}
              <Link href="/privacy" className=" hover:underline">
                Privacy Policy
              </Link>{" "}
              and consent to being contacted regarding your inquiry.
            </p>
          </form>
        </div>

        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
              Other Ways to Connect
            </h2>
            <p className="text-sm md:text-base text-foreground/70">
              Prefer to reach out directly? Here are several ways to get in
              touch with our team.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="p-4 md:p-6 rounded-xl border  bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2  rounded-full shrink-0">
                  <Mail className="size-5 " />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">Email Us</h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">
                    For questions, feedback, or support:
                  </p>
                  <ul className="space-y-1 text-xs md:text-sm">
                    <li>
                      <strong>General:</strong>{" "}
                      <a
                        href="mailto:hello@vyse.app"
                        className=" hover:underline"
                      >
                        hello@vyse.app
                      </a>
                    </li>
                    <li>
                      <strong>Support:</strong>{" "}
                      <a
                        href="mailto:support@vyse.app"
                        className=" hover:underline"
                      >
                        support@vyse.app
                      </a>
                    </li>
                    <li>
                      <strong>Bug Reports:</strong>{" "}
                      <a
                        href="mailto:bugs@vyse.app"
                        className=" hover:underline"
                      >
                        bugs@vyse.app
                      </a>
                    </li>
                    <li>
                      <strong>Features:</strong>{" "}
                      <a
                        href="mailto:features@vyse.app"
                        className=" hover:underline"
                      >
                        features@vyse.app
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-xl border  bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2  rounded-full shrink-0">
                  <Github className="size-5 " />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    Open Source
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">
                    Vyse is fully open source on GitHub
                  </p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p>
                      <strong>Repository:</strong>{" "}
                      <a
                        href="https://github.com/0xpratikpatil/vyse"
                        className=" hover:underline"
                      >
                        github.com/0xpratikpatil/vyse
                      </a>
                    </p>
                    <p>
                      <strong>Issues:</strong> Report bugs or request features
                    </p>
                    <p>
                      <strong>Discussions:</strong> Ask questions and share
                      ideas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-xl border  bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2  rounded-full shrink-0">
                  <MessageCircle className="size-5 " />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    Community
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">
                    Join our growing community of writers and developers
                  </p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p>
                      <strong>Discord:</strong> Chat with users and contributors
                    </p>
                    <p>
                      <strong>Twitter:</strong> Follow{" "}
                      <a
                        href="https://twitter.com/0xpratikpatil"
                        className=" hover:underline"
                      >
                        @0xpratikpatil
                      </a>{" "}
                      for updates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-xl border  bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2  rounded-full shrink-0">
                  <MapPin className="size-5 " />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    Maintainer
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">
                    Built and maintained by:
                  </p>
                  <div className="text-xs md:text-sm">
                    <p>
                      <strong>Pratik Patil</strong> -{" "}
                      <a
                        href="https://pratikpatil.me"
                        className=" hover:underline"
                      >
                        pratikpatil.me
                      </a>
                    </p>
                    <p>Open source enthusiast & developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-border">
        <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-center">
          Join the Vyse Community
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center">
            <div className="mx-auto p-3  rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
              <Github className="size-6 md:size-8 " />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">
              Contribute
            </h3>
            <p className="text-xs md:text-sm text-foreground/70">
              Help make Vyse better by contributing code, reporting bugs, or
              suggesting features.
            </p>
            <Link
              href="https://github.com/0xpratikpatil/vyse"
              className="mt-3 md:mt-4 inline-block  hover:underline text-xs md:text-sm"
            >
              View on GitHub →
            </Link>
          </div>

          <div className="text-center">
            <div className="mx-auto p-3  rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
              <Users className="size-6 md:size-8 " />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">Community</h3>
            <p className="text-xs md:text-sm text-foreground/70">
              Connect with other Vyse users, share tips, and get help from the
              community.
            </p>
            <Link
              href="/community"
              className="mt-3 md:mt-4 inline-block  hover:underline text-xs md:text-sm"
            >
              Join Community →
            </Link>
          </div>

          <div className="text-center">
            <div className="mx-auto p-3  rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
              <Mail className="size-6 md:size-8 " />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">
              Stay Updated
            </h3>
            <p className="text-xs md:text-sm text-foreground/70">
              Subscribe to our newsletter for updates on new features and
              improvements.
            </p>
            <Link
              href="/newsletter"
              className="mt-3 md:mt-4 inline-block  hover:underline text-xs md:text-sm"
            >
              Subscribe →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
