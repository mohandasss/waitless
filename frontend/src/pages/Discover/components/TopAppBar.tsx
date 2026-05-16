import React from 'react';
import { Button } from "@/components/ui/button";

export const TopAppBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-surface dark:bg-surface-dim flex justify-between items-center w-full px-container-padding py-md flat no shadows">
      <div className="text-headline-lg-mobile font-headline-lg-mobile text-primary dark:text-primary-fixed-dim">WaitLess</div>
      <div className="flex items-center gap-md">
        <Button variant="ghost" size="icon" className="relative hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors p-sm rounded-full active:scale-95 duration-150 ease-in-out">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface"></span>
        </Button>
        <div className="hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors rounded-full active:scale-95 duration-150 ease-in-out cursor-pointer">
          <img alt="User profile photo" className="w-[36px] h-[36px] rounded-full object-cover border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMXhPMJIoSZ1LKL0oWsAI4VY2-fpyZ644HDwaWjo177-0sRezeJVYMvJTPagRWBz6elUvWsdkJb5NZ3_Mm9frz-T-klbGBbyYywa2EVmDzzyFZXIMt1HwFNP1hicr4wK8E2NmuN72zaT8z-mTjjQFIQP5k_sM1aK0hqhfGimHUEzzLa8e2-hOwm0t8wcieElvNS7FGaTvJH0rs2Pq2H28wJH9i3kxnUwTzhXTUa_7LXsPvajfLFSDg0p433EnkL1ngF__DTW1EsyjZ" />
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
