
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

const Hero = ({ 
  title, 
  description, 
  className,
  ...props 
}: HeroProps) => {
  const { t } = useTranslation();
  
  return (
    <div className={cn("py-16 md:py-24 text-center", className)} {...props}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title || t('hero.title')}</h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">{description || t('hero.description')}</p>
    </div>
  );
};

export default Hero;
