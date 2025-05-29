import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section id="get-started" className="py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-primary/20 bg-gradient-to-br from-background to-primary/10 dark:from-background dark:to-primary/5 px-6 py-12 md:py-20 lg:py-32">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Write Without <span className="text-primary">Limits</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Vyse is your space to think, create, and focus. No clutter. No distractions. Just you and your words—beautifully simple, endlessly powerful.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"

            >
              <Link href="/register">
                <span>Start Writing Free</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
