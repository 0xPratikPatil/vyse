import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, MessageCircle, Users, Shield } from 'lucide-react';

const ContactPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">Reach Out to Vyse</h2>
            <p className="text-sm md:text-base text-foreground/70">
              Have questions about Vyse, our features, or need help with your writing? We're here to help you focus on what matters most—your words.
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
                <Input id="email" type="email" placeholder="you@company.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Organization (optional)</Label>
              <Input id="company" placeholder="Your organization" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inquiryType">How can we help?</Label>
              <select 
                id="inquiryType" 
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
              >
                <option value="" disabled selected>Select an option</option>
                <option value="sales">Product Inquiry</option>
                <option value="demo">Request a Demo</option>
                <option value="support">Editor Support</option>
                <option value="feedback">Share Feedback</option>
                <option value="community">Community & Events</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us how we can help you..." 
                rows={4}
                className="min-h-[100px]"
              />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
              Send Message
            </Button>
            
            <p className="text-xs text-foreground/60 mt-2">
              By submitting this form, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and consent to being contacted regarding your inquiry.
            </p>
          </form>
        </div>
        
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">Other Ways to Connect</h2>
            <p className="text-sm md:text-base text-foreground/70">
              Prefer to reach out directly? Here's how you can connect with the Vyse team.
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">Email Us</h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">For the fastest response, email:</p>
                  <ul className="space-y-1 text-xs md:text-sm">
                    <li><strong>Support:</strong> <a href="mailto:support@vyse.app" className="text-primary hover:underline">support@vyse.app</a></li>
                    <li><strong>Feedback:</strong> <a href="mailto:feedback@vyse.app" className="text-primary hover:underline">feedback@vyse.app</a></li>
                    <li><strong>Press:</strong> <a href="mailto:press@vyse.app" className="text-primary hover:underline">press@vyse.app</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">Call Us</h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">Available Monday-Friday, 9am-5pm PT</p>
                  <p className="text-base md:text-lg">+1 (800) 123-4567</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">Visit Us</h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">Our headquarters:</p>
                  <address className="not-italic text-xs md:text-sm">
                    Vyse, Inc.<br />
                    123 Creative Avenue<br />
                    Suite 500<br />
                    San Francisco, CA 94107<br />
                    United States
                  </address>
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full shrink-0">
                  <MessageCircle className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">Live Chat</h3>
                  <p className="text-xs md:text-sm text-foreground/70 mb-2">Chat with our support team directly from the Vyse editor.</p>
                  <p className="text-xs md:text-sm">Available for all Vyse users.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-border">
        <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 text-center">We're Here For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center">
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
              <Users className="size-6 md:size-8 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">Join a Community Session</h3>
            <p className="text-xs md:text-sm text-foreground/70">
              Join a live session to learn tips, tricks, and get inspired by other writers and creators.
            </p>
            <Link href="/community" className="mt-3 md:mt-4 inline-block text-primary hover:underline text-xs md:text-sm">See Community Events →</Link>
          </div>
          
          <div className="text-center">
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
              <Shield className="size-6 md:size-8 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">Report a Vulnerability</h3>
            <p className="text-xs md:text-sm text-foreground/70">
              Found a security issue? We appreciate responsible disclosure.
            </p>
            <Link href="/security" className="mt-3 md:mt-4 inline-block text-primary hover:underline text-xs md:text-sm">Vulnerability Disclosure →</Link>
          </div>
          
          <div className="text-center">
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4">
              <Mail className="size-6 md:size-8 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-medium mb-2">Stay Updated</h3>
            <p className="text-xs md:text-sm text-foreground/70">
              Subscribe to our newsletter for the latest writing tips, product updates, and inspiration.
            </p>
            <Link href="/newsletter" className="mt-3 md:mt-4 inline-block text-primary hover:underline text-xs md:text-sm">Subscribe →</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage; 