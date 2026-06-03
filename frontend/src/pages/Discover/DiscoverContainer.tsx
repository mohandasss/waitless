import React, { useState } from 'react';
import DiscoverPresenter from './DiscoverPresenter';
import useSalons from '@/hooks/useSalons';

export const DiscoverContainer: React.FC = () => {
  const [location, setLocation] = useState('Kolkata, WB');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useSalons(1, 20, searchQuery);

  const handleCategoryClick = (id: string) => {};

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleJoinQueue = (salonId: string) => {
    console.log(`Joining queue for salon ${salonId}`);
  };

  const handleBookSlot = (salonId: string) => {
    console.log(`Booking slot for salon ${salonId}`);
  };

  return (
    <DiscoverPresenter
      loading={isLoading}
      error={error as any}
      location={location}
      searchQuery={searchQuery}
      categories={[]}
      heroSalon={data?.data?.[0]}
      salons={data?.data ?? []}
      onCategoryClick={handleCategoryClick}
      onSearch={handleSearch}
      onJoinQueue={handleJoinQueue}
      onBookSlot={handleBookSlot}
    />
  );
};

export default DiscoverContainer;
