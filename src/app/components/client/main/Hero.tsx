import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  backgroundImage: string;
  minHeight?: string | number;
  topPadding?: string | number;
  onButtonClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  minHeight = '866px',
}) => {

  return (
    <section 
      className="relative w-full"
      style={{ 
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight 
      }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default HeroSection;