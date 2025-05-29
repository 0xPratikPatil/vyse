import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, FileText, Bell } from 'lucide-react';

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Vyse Newsletter</h1>
      <p className="mb-4 text-sm text-foreground/70">Subscribe to the Vyse newsletter for the latest writing tips, product updates, and inspiration. Stay in the loop with everything happening in the Vyse community.</p>
      <section className="bg-background/70 backdrop-blur-sm border border-primary/10 rounded-xl p-8 mb-16">
        <h2 className="text-xl font-semibold mt-8 mb-2">Why Subscribe?</h2>
        <ul className="list-disc pl-6 mb-4 text-sm">
          <li>Get writing tips and productivity hacks</li>
          <li>Be the first to know about new features</li>
          <li>Join a community of writers and creators</li>
        </ul>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" id="consent" className="mt-1" required />
            <label htmlFor="consent" className="text-sm">
              I agree to receive communications from Vyse. You can unsubscribe at any time. For more information, please read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </label>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
            Subscribe
          </Button>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-8 mb-2">What You'll Get</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bell className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Timely Updates</h3>
              <p className="text-foreground/70">
                Be the first to know about new features, improvements, and updates to Vyse.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Writing Inspiration</h3>
              <p className="text-foreground/70">
                Get exclusive writing tips, productivity hacks, and creative prompts.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/10 rounded-full">
              <Mail className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Community Stories</h3>
              <p className="text-foreground/70">
                Discover resources, best practices, and stories from the Vyse community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 