
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ComponentFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default ComponentFilter;
