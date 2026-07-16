import Navbar from '../components/portfolio/Navbar';
import CustomCursor from '../components/portfolio/CustomCursor';
import Hero from '../components/portfolio/Hero';
import MarqueeBand from '../components/portfolio/MarqueeBand';
import About from '../components/portfolio/About';
import Skills from '../components/portfolio/Skills';
import Services from '../components/portfolio/Services';
import Portfolio from '../components/portfolio/Portfolio';
import WhyChooseMe from '../components/portfolio/WhyChooseMe';
import Testimonials from '../components/portfolio/Testimonials';
import Process from '../components/portfolio/Process';
import FAQ from '../components/portfolio/FAQ';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <div className="noise" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <Hero />
      <MarqueeBand />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <WhyChooseMe />
      <Testimonials />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}