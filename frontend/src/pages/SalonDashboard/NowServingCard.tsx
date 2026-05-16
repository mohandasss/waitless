import React from "react";
import { PlayCircle, Scissors } from "lucide-react";
import stylistHeadshot from "@/assets/stylist_headshot.png";
export function NowServingCard() {
  return (
    <section className="bg-surface-container-lowest rounded-md p-md md:p-lg shadow-[0px_6px_20px_rgba(0,0,0,0.06)] border border-surface-container-high relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      <p className="font-meta-label text-xs absolute right-3 top-2 text-meta-label text-primary font-bold flex items-center gap-2 mb-md">
        <PlayCircle className="h-4 w-4" />
        NOW SERVING
      </p>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
        <div className="flex gap-lg items-center">
         
          <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
            {/* <span className="font-headline-lg-mobile text-headline-lg-mobile">#15</span> */}
             <img
                src={stylistHeadshot}
                alt="Vikram"
                className="w-18 h-18 rounded-full object-cover"
              />
          </div>
          <div className="flex flex-col gap-xs">
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile">Rahul S.</h3>
            <p className="font-card-title text-card-title text-on-surface-variant flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Haircut + Beard
            </p>
            <p className="font-wait-time text-wait-time text-on-surface-variant opacity-70 mt-1">Time Started: 12 mins ago</p>
          </div>
        </div>
      </div>
    </section>
  );
}
