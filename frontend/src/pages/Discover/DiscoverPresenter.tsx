import React from 'react';
import { Button } from "@/components/ui/button";
import TopAppBar from './components/TopAppBar';
import SearchSection from './components/SearchSection';
import CategoryFilters from './components/CategoryFilters';
import HeroSalonCard from './components/HeroSalonCard';
import SalonListItem from './components/SalonListItem';
import BottomNavBar from './components/BottomNavBar';

interface Category {
  id: string;
  name: string;
  active?: boolean;
}

interface QueueInfo {
  waiting: number;
  estTime: string;
}

interface Salon {
  id: string;
  name: string;
  rating: number;
  distance: string;
  price: string;
  image: string;
  badges?: string[];
  queue: QueueInfo;
}

interface DiscoverPresenterProps {
  loading: boolean;
  error: string | null;
  location: string;
  searchQuery: string;
  categories: Category[];
  heroSalon: Salon;
  salons: Salon[];
  onCategoryClick: (id: string) => void;
  onSearch: (query: string) => void;
  onJoinQueue: (salonId: string) => void;
  onBookSlot: (salonId: string) => void;
}

const DiscoverPresenter: React.FC<DiscoverPresenterProps> = ({
  loading,
  error,
  location,
  searchQuery,
  categories,
  heroSalon,
  salons,
  onCategoryClick,
  onSearch,
  onJoinQueue,
  onBookSlot,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-poppins">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-on-surface-variant font-meta-label">Loading amazing looks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-container-padding font-poppins">
        <span className="material-symbols-outlined text-error text-[48px]">error</span>
        <p className="mt-4 text-on-surface font-headline-lg-mobile text-center">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-6 bg-primary text-on-primary px-lg py-sm rounded-full font-body-cta h-auto"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background font-poppins text-on-background antialiased min-h-screen pb-[100px]">
      {/* TopAppBar */}
      <TopAppBar />

      {/* Header & Search Context */}
      <SearchSection 
        location={location}
        searchQuery={searchQuery}
        onSearch={onSearch}
      />

      {/* Category Filters */}
      <CategoryFilters 
        categories={categories}
        onCategoryClick={onCategoryClick}
      />

      {/* Main Content Canvas */}
      <main className="px-container-padding pt-md pb-xl">
        {/* Hero Salon Card (Featured) */}
        <HeroSalonCard 
          heroSalon={heroSalon}
          onJoinQueue={onJoinQueue}
          onBookSlot={onBookSlot}
        />

        {/* Secondary Feed Header */}
        <h3 className="font-card-title text-card-title text-on-surface mb-md">Popular Nearby</h3>

        {/* List Section */}
        <div className="flex flex-col gap-lg">
          {salons.map((salon) => (
            <SalonListItem 
              key={salon.id}
              salon={salon}
              onJoinQueue={onJoinQueue}
            />
          ))}
        </div>
      </main>

      {/* BottomNavBar */}
      <BottomNavBar />
    </div>
  );
};

export default DiscoverPresenter;
