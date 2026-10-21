import React from 'react'
import SectionHeading from './SectionHeading'

const AboutUs: React.FC = () => (
  <section id="about">
    <SectionHeading index="01" title="About" />

    <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
      <p>
        I&apos;m a <span className="text-foreground">full-stack developer</span> who enjoys
        building modern applications end to end — from polished frontend interfaces to the
        backend systems behind them.
      </p>
      <p>
        I care about clean, maintainable code and user-friendly solutions. My goal is to ship
        efficient, scalable software that solves{" "}
        <span className="font-serif text-xl italic text-foreground">real-world</span> problems.
      </p>
    </div>
  </section>
)

export default AboutUs
