import React from 'react';
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  active?: boolean;
}

interface CategoryFiltersProps {
  categories: Category[];
  onCategoryClick: (id: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  onCategoryClick,
}) => {
  return (
    <nav className="px-container-padding py-md flex gap-sm overflow-x-auto snap-x no-scrollbar bg-surface">
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          variant="ghost"
          className={`snap-start shrink-0 px-lg py-sm rounded-full font-body-cta text-body-cta transition-colors flex items-center gap-xs h-auto ${
            category.active
              ? 'bg-on-surface !text-white shadow-md hover:bg-on-surface/90'
              : 'bg-surface-container-low border border-surface-variant text-on-surface hover:bg-surface-container-high'
          }`}
        >
          {category.name}
        </Button>
      ))}
    </nav>
  );
};

export default CategoryFilters;
