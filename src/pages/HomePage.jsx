
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SubjectCards from '@/components/home/SubjectCards';
import FeaturedResources from '@/components/home/FeaturedResources';
import AdvancedSearch from '@/components/home/AdvancedSearch';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import HowItWorks from '@/components/home/HowItWorks';
import LearningPathChooser from '@/components/home/LearningPathChooser';
import resourcesData from '@/data/resources';

const HomePage = () => {
  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      <HeroSection />
      <LearningPathChooser />
      <SubjectCards />
      <HowItWorks />
      <FeaturedResources resources={resourcesData.slice(0,6)} title="Recursos Destacados" />
      <AdvancedSearch />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
