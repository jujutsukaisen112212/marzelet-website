import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { CompanyJourney } from '../components/sections/CompanyJourney';
import Services from '../components/services/Services';
import { Portfolio } from '../components/sections/Portfolio';
import { Reviews } from '../components/sections/Reviews';
import { Partners } from '../components/sections/Partners';
import { Blog } from '../components/sections/Blog';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="journey">
        <CompanyJourney />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
      <section id="partners">
        <Partners />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};