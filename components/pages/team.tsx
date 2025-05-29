import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FounderImage from "@/public/team/Founder.png";

export const metadata = {
  title: "Our Team | Vyse Text Editor",
  description:
    "Meet the minds behind Vyse - the beautiful, minimal text editor built for everyone who writes.",
};

const members = [
  {
    name: "Pratik Patil",
    role: "Founder & Lead Developer",
    bio: "Open source enthusiast and developer passionate about creating beautiful, functional tools that make writing effortless for everyone.",
    avatar: FounderImage,
    link: "https://pratikpatil.me",
  },
];

const contributors = [
  {
    name: "Community Contributors",
    role: "Open Source Heroes",
    bio: "Amazing developers from around the world who contribute code, ideas, and feedback to make Vyse better.",
    avatar: "",
    link: "https://github.com/0xpratikpatil/vyse/contributors",
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold lg:text-5xl">Our Team</h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Meet the people building Vyse - the text editor designed for everyone
          who writes
        </p>
      </div>

      <section className="py-8 md:py-12">
        <div className="border-t  pt-8 md:pt-12">
          <span className="-mt-5 -ml-2 inline-block bg-white px-4 text-sm  font-medium dark:bg-gray-950">
            Core Team
          </span>
          <div className="mt-6 md:mt-10 grid gap-6 md:gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Built with ❤️</h2>
              <div className="mt-2 h-1 w-10  rounded-full"></div>
            </div>
            <div className="flex items-center">
              <p className="text-foreground/70">
                Vyse is crafted by passionate developers who believe writing
                should be beautiful, effortless, and accessible to everyone. As
                an open source project, our community of contributors helps
                shape the future of digital writing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-xl border  transition-all duration-300  hover:shadow-md"
              >
                <div className="relative h-80 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {member.avatar ? (
                    <Image
                      className="h-full w-full object-cover object-top transition-all duration-500 grayscale hover:grayscale-0 group-hover:scale-105"
                      src={member.avatar}
                      alt={`${member.name}, ${member.role}`}
                      width={600}
                      height={800}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-bold /20">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm text-white/90">{member.bio}</p>
                  </div>
                </div>
                <div className="px-4 py-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium group-hover: transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs /70 font-mono">_0{index + 1}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className=" text-sm">{member.role}</span>
                    <Link
                      href={member.link}
                      className="text-sm text-foreground/70 hover: transition-colors hover:underline"
                    >
                      Connect
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {contributors.map((contributor, index) => (
              <div
                key={`contributor-${index}`}
                className="group overflow-hidden rounded-xl border  transition-all duration-300  hover:shadow-md"
              >
                <div className="relative h-80 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <div className="flex h-full w-full items-center justify-center text-6xl font-bold /20">
                    🌟
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm text-white/90">{contributor.bio}</p>
                  </div>
                </div>
                <div className="px-4 py-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium group-hover: transition-colors">
                      {contributor.name}
                    </h3>
                    <span className="text-xs /70 font-mono">_∞</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className=" text-sm">{contributor.role}</span>
                    <Link
                      href={contributor.link}
                      className="text-sm text-foreground/70 hover: transition-colors hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-10 border-t ">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold">Join Our Mission</h3>
              <p className="mt-4 text-foreground/70">
                Vyse is more than just a text editor — it's a community-driven
                project that believes in making writing beautiful and accessible
                for everyone. Whether you're a developer, designer, writer, or
                just someone who cares about great tools, there's a place for
                you here.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link
                    href="https://github.com/0xpratikpatil/vyse"
                    target="_blank"
                  >
                    Contribute on GitHub
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Ways to Contribute</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border ">
                  <div className="font-medium text-sm">🐞 Report Bugs</div>
                  <div className="text-xs text-foreground/70 mt-1">
                    Found something broken? Let us know!
                  </div>
                </div>

                <div className="p-3 rounded-lg border ">
                  <div className="font-medium text-sm">🌟 Request Features</div>
                  <div className="text-xs text-foreground/70 mt-1">
                    Have an idea to make Vyse better?
                  </div>
                </div>

                <div className="p-3 rounded-lg border ">
                  <div className="font-medium text-sm">
                    👨‍💻 Submit Pull Requests
                  </div>
                  <div className="text-xs text-foreground/70 mt-1">
                    Help us build the future of writing
                  </div>
                </div>

                <div className="p-3 rounded-lg border ">
                  <div className="font-medium text-sm">📣 Spread the Word</div>
                  <div className="text-xs text-foreground/70 mt-1">
                    Share Vyse with fellow writers and creators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
