import React from 'react';

const members = [
  {
    name: 'Pratik Patil',
    role: 'Founder & Maker',
    bio: 'Passionate about building tools that help people write, think, and create. Pratik started Vyse to make writing joyful for everyone.',
    link: 'https://pratikpatil.me',
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Meet the Vyse Team</h1>
        <p className="mb-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Vyse is built by a small, passionate team dedicated to making writing effortless for everyone. We believe in minimalism, creativity, and empowering writers of all kinds.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <div key={index} className="group overflow-hidden rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 dark:border-primary/10 hover:shadow-md">
            <div className="flex flex-col items-center p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{member.name}</h3>
              <span className="text-primary text-sm mb-2">{member.role}</span>
              <p className="text-sm text-foreground/70 text-center mb-2">{member.bio}</p>
              <a href={member.link} className="text-sm text-primary hover:underline">Connect</a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 pt-10 border-t border-primary/10 text-center">
        <h3 className="text-2xl font-semibold">Join Our Team</h3>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
          Want to help people write better? We're always looking for creative minds. If you're interested in joining Vyse, check out our open positions.
        </p>
        <div className="mt-6">
          <a 
            href="/careers" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
} 