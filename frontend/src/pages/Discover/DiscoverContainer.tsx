import React, { useState, useEffect } from 'react';
import DiscoverPresenter from './DiscoverPresenter';

// Mock Data
const MOCK_CATEGORIES = [
  { id: 'haircut', name: 'Haircut', active: true },
  { id: 'beard', name: 'Beard' },
  { id: 'facial', name: 'Facial' },
  { id: 'premium', name: 'Premium' },
  { id: 'nearby', name: 'Nearby' },
];

const MOCK_HERO_SALON = {
  id: '1',
  name: 'The Urban Groom',
  rating: 4.9,
  distance: '1.2 km',
  price: '$$$',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTj7JA2NflYgQSDQRESo2dTGX8QZRYp1HQDgBN0I6Cnu3MVWgAVUs6G_-r7OXlBspmMUf0xpDDMw_MMZ-PE0nq6oKmv-QcMOzX0Ghjm55WbDadzz-4GUB3tNNreXfBPwIsiDdqZ5-jy5S11hF_zsjJggUS2-Sge0-TLZAaMzcF-Jf_Zq3BkoWLYFMQ7aybd3Ta7X4OoZVi-I0sO0vLvU4hOBcXKPIYVQxH-H1dksPYM3CJMYWhTHA6zNVL27GIUUrGXlpRbHBzgljQ',
  badges: ['Open Now', 'Low Wait'],
  queue: {
    waiting: 4,
    estTime: '~35 min'
  }
};

const MOCK_SALONS = [
  {
    id: '2',
    name: 'Style & Co.',
    rating: 4.8,
    distance: '2.5 km',
    price: '$$',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtthIie22pJi3_ndse0CoamAn0NBhRzAm35YhpDM31feGis6QukA7Wea58JrulB_NHulyACUSMqMTex60TTupuPlZfKuk1gPaSGeSnzJ4aVLswfhtm1MpVDyWfDcYE3LTgHrkOB5VmD0EQBaHgYLG9aBYiplgPH_H9XiTMi__Ou6OjZuuVMXnA5suwyFuiRRLM9PzhtiQT2KEkBgkIaEteor463Xu7pd1dIkcbrdBXd3Dxl27NBwCzSnTxggg9YeV0Im3YPaTz-bG4',
    queue: {
      waiting: 2,
      estTime: '30 min'
    }
  },
  {
    id: '3',
    name: 'The Royal Fade',
    rating: 4.7,
    distance: '0.8 km',
    price: '$$$',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATiKmRYNjx5RbaWeNCghcEquSyVnR5oRP9HJRxzzxHc-gME4esTWMpW7bypzqFyxJEJ4z6vaPoJbJFApNJqgKK55iptlgD8bVz5ul3s09xJAcMx3-qvQGgW_S0F2j--uxilitNtBwk48YSOKEGQnqT-6mUGdi8vOW7mkqCe5-r15Ft4i6Y_pmk3i8jAXLr2TFbbGlFYYNZRu_1HAw1_pBhyuntGPbixo2p8vFjcqBdjWSSSGobADrKy6W9aeGMj2WcL1snozciKL8T',
    queue: {
      waiting: 1,
      estTime: '15 min'
    },
    badges: ['Walk-in']
  }
];

export const DiscoverContainer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('Kolkata, WB');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [heroSalon, setHeroSalon] = useState(MOCK_HERO_SALON);
  const [salons, setSalons] = useState(MOCK_SALONS);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (id: string) => {
    setCategories(categories.map(cat => ({
      ...cat,
      active: cat.id === id
    })));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In real app, filter data or call API
  };

  const handleJoinQueue = (salonId: string) => {
    console.log(`Joining queue for salon ${salonId}`);
  };

  const handleBookSlot = (salonId: string) => {
    console.log(`Booking slot for salon ${salonId}`);
  };

  return (
    <DiscoverPresenter
      loading={loading}
      error={error}
      location={location}
      searchQuery={searchQuery}
      categories={categories}
      heroSalon={heroSalon}
      salons={salons}
      onCategoryClick={handleCategoryClick}
      onSearch={handleSearch}
      onJoinQueue={handleJoinQueue}
      onBookSlot={handleBookSlot}
    />
  );
};

export default DiscoverContainer;
