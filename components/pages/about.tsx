const AboutPage = () => {
  return (
    <>
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-base md:text-lg mb-4">
          Vyse exists to make writing feel effortless. We believe great writing
          tools should fade into the background — letting your ideas take center
          stage without friction or distraction.
        </p>
        <p className="text-sm md:text-base">
          In a world full of cluttered apps and noisy interfaces, Vyse offers a
          breath of calm. Whether you're drafting your next novel, capturing
          class notes, or writing technical documentation, Vyse is designed to
          help you stay focused, flow faster, and enjoy the process.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>

        <div>
          <p className="mb-4">
            Vyse began as a side project — a better note-taking experience for
            our founder that didn’t feel like using enterprise software. What
            started as a clean, distraction-free editor quickly evolved into a
            powerful tool for writers, students, and teams.
          </p>
          <p className="mb-4">
            As more people discovered Vyse, they asked for smart features: task
            lists, search, embeds, collaboration. But always with the same core
            principles: fast, simple, beautiful.
          </p>
          <p className="mb-4">
            Since our public launch, Vyse has grown into a thriving open-source
            platform — built with community input and maintained with care. And
            we’re just getting started.
          </p>
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8">
          <div className="p-4 md:p-6 rounded-xl border bg-background/70 backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-medium  mb-3">
              Simplicity by Design
            </h3>
            <p className="text-sm md:text-base">
              Every detail in Vyse exists for a reason. We aim to reduce noise,
              friction, and bloat — so you can focus on what matters: your
              words.
            </p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border bg-background/70 backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-medium mb-3">
              Thoughtful Innovation
            </h3>
            <p className="text-sm md:text-base">
              We’re not here to overwhelm with features. We build what’s useful
              — smart tools that feel invisible, assist without intruding, and
              elevate your writing.
            </p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border bg-background/70 backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-medium mb-3">
              Community-Driven
            </h3>
            <p className="text-sm md:text-base">
              Vyse is open-source and shaped by its users. We listen, iterate,
              and grow with the people who use Vyse every day.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
