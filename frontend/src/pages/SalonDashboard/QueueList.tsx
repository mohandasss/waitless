import React from "react";
import { Clock, MoreVertical } from "lucide-react";
import customerAman from "@/assets/customer_aman.png";
import customerVikram from "@/assets/customer_vikram.png";
import customerAlex from "@/assets/customer_alex.png";

export function QueueList() {
  const customers = [
    { id: "#16", name: "Aman", status: "Next up", opacity: false, image: customerAman },
    { id: "#17", name: "Vikram", status: "Waiting", opacity: false, image: customerVikram },
    { id: "#18", name: "Alex", status: "Waiting", opacity: true, image: customerAlex },
  ];

  return (
    <section className="flex flex-col gap-md">
      <div className="flex justify-between items-end mb-sm border-b border-surface-container-high pb-sm">
        <div>
          <h3 className="font-card-title text-card-title">Live Queue</h3>
          <p className="font-meta-label text-meta-label text-on-surface-variant">8 Waiting</p>
        </div>
        <div className="bg-surface-container text-on-surface px-3 py-1 rounded-full font-meta-label text-meta-label flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Avg Wait: 14 mins
        </div>
      </div>
      
      {/* Queue List */}
      <div className="flex flex-col gap-sm">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className={`flex items-center justify-between p-md bg-surface-container-lowest rounded-md border border-surface-container-high shadow-[0px_2px_8px_rgba(0,0,0,0.02)] ${
              customer.opacity ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-center gap-md">
              <img
                src={customer.image}
                alt={customer.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <span className="font-card-title text-card-title">{customer.name}</span>
                <span className="font-meta-label text-meta-label text-on-surface-variant">{customer.status}</span>
              </div>
            </div>
            <button className="text-primary p-2 hover:bg-primary/10 rounded-full transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full py-md mt-sm border border-outline-variant text-primary rounded-lg font-body-cta text-body-cta hover:bg-primary/5 transition-colors">
        View Full Queue
      </button>
    </section>
  );
}

