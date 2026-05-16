import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeroHeading from './HeroHeading';

interface SearchSectionProps {
  location: string;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  location,
  searchQuery,
  onSearch,
}) => {
  return (
    <section className="px-container-padding pt-sm pb-md bg-surface z-30 relative">
      <div className="flex items-center gap-xs text-on-surface-variant font-meta-label text-meta-label mb-sm cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">location_on</span>
        <span className="font-wait-time text-wait-time text-on-surface">{location}</span>
        <span className="material-symbols-outlined text-[18px]">expand_more</span>
      </div>
      {/* <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-lg max-w-[250px]">Find your next fresh look</h1> */}
      <div className="mb-lg">
        <HeroHeading/>
      </div>

      {/* Search Pill */}
      <div className="flex items-center bg-surface-container-low rounded-full p-xs shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-surface-container-highest transition-all focus-within:border-outline-variant focus-within:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
        <span className="material-symbols-outlined text-on-surface-variant ml-md mr-sm">search</span>
        <Input 
          className="bg-transparent border-none focus-visible:ring-0 outline-none w-full font-body-cta text-body-cta text-on-surface placeholder-on-surface-variant py-sm h-auto" 
          placeholder="Search salon, barber, beard..." 
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button className="bg-primary text-on-primary !text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-[0px_4px_10px_rgba(186,0,54,0.3)] hover:bg-primary/90">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
        </Button>
      </div>
    </section>
  );
};

export default SearchSection;
