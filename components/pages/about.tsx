import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Pratik Patil',
      role: 'Founder & Maker',
      image: '/team/pratik-patil.jpg',
      bio: 'Passionate about building tools that help people write, think, and create. Pratik started Vyse to make writing joyful for everyone.'
    }
  ];

  return (
    <>
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Vyse?</h2>
        <p className="text-base md:text-lg mb-4">
          Vyse is a beautifully minimal, feature-rich online text editor designed to make writing effortless. Whether you're a writer, student, developer, or everyday note-taker — Vyse helps you focus on content, not clutter.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-4 text-sm md:text-base">
          <li>Rich Text Formatting — Bold, italic, underline, highlight, sub/superscript, alignment, and more</li>
          <li>Drag & Drop Images — With smooth loading placeholders</li>
          <li>Smart Search & Replace — Instant content discovery and updates</li>
          <li>Task Lists — Stay productive and check off your to-dos</li>
          <li>Tables — Organize structured content with ease</li>
          <li>YouTube Embeds — Paste a link and it just works</li>
          <li>Goto Navigation — Instantly jump to headings and sections</li>
          <li>Password-Protected Sharing — Secure links for private notes</li>
          <li>Beautiful UI — A clean, distraction-free writing environment</li>
        </ul>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Who's Vyse for?</h2>
        <ul className="list-disc pl-6 mb-4 text-sm md:text-base">
          <li>Writers & Bloggers ✍️</li>
          <li>Students & Academics 📚</li>
          <li>Developers writing documentation 💻</li>
          <li>Creatives planning ideas 🧠</li>
          <li>You.</li>
        </ul>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mb-8">
          <div>
            <p className="mb-4">
              Vyse began as a side project by a group of writers and developers who wanted a better way to focus on words, not clutter. Frustrated by bloated editors, they built Vyse to be fast, minimal, and beautiful.
            </p>
            <p className="mb-4">
              What started as a tool for personal use quickly grew into a platform loved by writers, students, and professionals worldwide. Today, Vyse continues to evolve with the needs of its creative community.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative">
              {/* Replace with actual company image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Vyse Timeline Image
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8">
          <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-medium text-primary mb-3">Simplicity</h3>
            <p className="text-sm md:text-base">
              We believe less is more. Vyse is designed to be clean, intuitive, and free from distractions.
            </p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-medium text-primary mb-3">Privacy</h3>
            <p className="text-sm md:text-base">
              Your words are yours alone. Vyse puts privacy first, with secure notes and password-protected sharing.
            </p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-medium text-primary mb-3">Creativity</h3>
            <p className="text-sm md:text-base">
              Vyse is a space to think, dream, and create—no matter who you are or what you write.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group p-4 md:p-6 rounded-xl border border-primary/10 bg-background/70 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                    Photo
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-medium">{member.name}</h3>
                  <p className="text-xs md:text-sm text-foreground/70">{member.role}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-foreground/80">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Vyse in the Community</h2>
        <p className="text-sm md:text-base mb-6">
          Vyse is loved by writers, students, and creators in over 50 countries. We support open-source, share writing tips, and host community events to inspire creativity.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="text-center p-3 md:p-4">
            <div className="text-primary text-2xl md:text-3xl font-bold">10,000+</div>
            <p className="text-xs md:text-sm text-foreground/70">Vyse Users</p>
          </div>
          <div className="text-center p-3 md:p-4">
            <div className="text-primary text-2xl md:text-3xl font-bold">50+</div>
            <p className="text-xs md:text-sm text-foreground/70">Countries</p>
          </div>
          <div className="text-center p-3 md:p-4">
            <div className="text-primary text-2xl md:text-3xl font-bold">100+</div>
            <p className="text-xs md:text-sm text-foreground/70">Community Events</p>
          </div>
          <div className="text-center p-3 md:p-4">
            <div className="text-primary text-2xl md:text-3xl font-bold">1M+</div>
            <p className="text-xs md:text-sm text-foreground/70">Words Written</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-sm md:text-base mb-6">
          Want to help people write better? We're always looking for creative minds. If you're interested in joining Vyse, check out our open positions.
        </p>
        <div className="mt-6">
          <a 
            href="/careers" 
            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutPage; 