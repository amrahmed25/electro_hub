import React from "react";
import Header from "./Header";
import { useCart } from "../CartContext";
import {
  Share2,
  PlayCircle,
  Eye,
  ShoppingCart,
  Heart,
  FileText,
  Pencil,
} from "lucide-react";

// ------------------- Mock Data -------------------
const savedCircuits = [
  { id: 1, name: "Modulo-10 Counter", date: "2034 2024" },
  { id: 2, name: "Full Adder V2", date: "2024 2023" },
  { id: 3, name: "Sensor Interface Logic", date: "2034 2024" },
  { id: 4, name: "Sensor Interface Logic", date: "2034 2024" },
  { id: 5, name: "Modulo-10 Counter", date: "2024 2023" },
  { id: 6, name: "Full Adder V2", date: "2034 2024" },
  { id: 7, name: "Modulo-10 Counter", date: "2034 2024" },
  { id: 8, name: "Full Adder V2", date: "2024 2023" },
  { id: 9, name: "Sensor Interface Logic", date: "2034 2024" },
];

// price added (not shown on the dashboard UI, but needed for the cart)
const generatedProjects = [
  {
    id: "proj-1",
    name: "Automated Plant Watering System",
    components: 12,
    status: "In Progress",
    price: 24.99,
  },
  {
    id: "proj-2",
    name: "Smart Home Blinds Control",
    components: 12,
    status: "Completed",
    price: 19.99,
  },
  {
    id: "proj-3",
    name: "Smart Home Blinds Control",
    components: 12,
    status: "Completed",
    price: 19.99,
  },
  {
    id: "proj-4",
    name: "Automated Plant Watering System",
    components: 12,
    status: "Completed",
    price: 24.99,
  },
  {
    id: "proj-5",
    name: "Smart Home Blinds Control",
    components: 12,
    status: "Completed",
    price: 19.99,
  },
];

const wishlistItems = [
  {
    id: "wl-1",
    name: "ATmega328P-PU",
    desc: "8-Bit AVR MCU, 32KJ Flash",
    price: 2.5,
    hasAlternatives: false,
  },
  {
    id: "wl-2",
    name: "ESP32-WROOM-32D",
    desc: "WIFI, module",
    price: 4.0,
    hasAlternatives: false,
  },
  {
    id: "wl-3",
    name: "DHT22 Sensor",
    desc: "Tumiibiting & Humidity",
    price: 1.2,
    hasAlternatives: false,
  },
  {
    id: "wl-4",
    name: "HC-SR04 Sensor",
    desc: "Hex Inverter Logic, DIP",
    price: 0.75,
    hasAlternatives: false,
  },
  {
    id: "wl-5",
    name: "1kOhm Resistors",
    desc: "Axial, pair of 100",
    price: 5.5,
    hasAlternatives: true,
  },
];

// ------------------- Status Badge -------------------
const StatusBadge = ({ status }) => {
  const isCompleted = status === "Completed";
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap ${
        isCompleted
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      }`}
    >
      {status}
    </span>
  );
};

// ------------------- Main Component -------------------
export default function UserDashboard() {
  const { addItem } = useCart();

  // Wishlist items -> Cart
  const handleAddWishlistToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      manufacturer: item.desc,
      price: item.price,
      image: null,
    });
  };

  // Generated Project -> Cart (added as a single bundled item)
  const handleAddProjectToCart = (project) => {
    addItem({
      id: project.id,
      name: project.name,
      manufacturer: `${project.components} Components`,
      price: project.price,
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-200">
      {/* Header */}
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white mb-6">
          ELECTROHUB | USER DASHBOARD
        </h1>

        {/* Profile Card */}
        <section className="bg-[#0b1526] border border-cyan-900/40 rounded-xl p-4 sm:p-5 mb-8 flex items-center justify-between gap-4 flex-wrap shadow-[0_0_20px_rgba(0,255,255,0.03)]">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Mohamed Sherif"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-cyan-500/50"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Mohamed Sherif
              </h2>
              <p className="text-sm text-slate-400">Communications Engineer</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
            <Pencil size={14} />
            EDIT PROFILE
          </button>
        </section>

        {/* Main Grid: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ---------------- Column 1: Saved Logic Circuits ---------------- */}
          <section>
            <h3 className="text-base font-semibold text-white mb-3">
              My Saved Logic Circuits{" "}
              <span className="text-slate-500 font-normal">(Grid)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {savedCircuits.map((circuit, idx) => (
                <div
                  key={`${circuit.id}-${idx}`}
                  className="bg-[#0b1526] border border-cyan-900/30 rounded-lg p-3 flex flex-col items-center hover:border-cyan-500/50 transition-colors"
                >
                  {/* Circuit Icon Placeholder */}
                  <div className="w-full h-16 mb-2 flex items-center justify-center text-cyan-400">
                    <svg
                      viewBox="0 0 60 30"
                      className="w-full h-full opacity-80"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M2 8 H14 M2 20 H14" />
                      <path d="M14 4 L14 24 L26 14 Z" />
                      <path d="M26 14 H38" />
                      <circle cx="41" cy="14" r="3" />
                      <path d="M44 14 H56" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-white text-center leading-tight">
                    {circuit.name}
                  </p>
                  <p className="text-[10px] text-slate-500 mb-2 text-center">
                    Save Det. {circuit.date}
                  </p>
                  <div className="flex gap-1 w-full">
                    <button className="flex-1 flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-medium py-1.5 rounded-md transition-colors">
                      <PlayCircle size={12} />
                      Open in Simulator
                    </button>
                    <button className="flex items-center justify-center gap-1 bg-slate-700/60 hover:bg-slate-600 text-white text-[10px] font-medium px-2 py-1.5 rounded-md transition-colors">
                      <Share2 size={12} />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- Column 2: Generated Projects ---------------- */}
          <section>
            <h3 className="text-base font-semibold text-white mb-3">
              Generated Projects{" "}
              <span className="text-slate-500 font-normal">(List)</span>
            </h3>
            <div className="flex flex-col gap-3">
              {generatedProjects.map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`}
                  className="bg-[#0b1526] border border-cyan-900/30 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white leading-tight">
                      {project.name}
                    </h4>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    {project.components} Components
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 border border-slate-600 hover:border-cyan-500 text-slate-200 text-xs font-medium py-1.5 rounded-md transition-colors">
                      <Eye size={13} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddProjectToCart(project)}
                      className="flex-1 flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium py-1.5 rounded-md transition-colors"
                    >
                      <ShoppingCart size={13} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- Column 3: Component Wishlist ---------------- */}
          <section>
            <h3 className="text-base font-semibold text-white mb-3">
              Component Wishlist{" "}
              <span className="text-slate-500 font-normal">(List)</span>
            </h3>
            <div className="flex flex-col gap-3">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0b1526] border border-cyan-900/30 rounded-lg p-3 flex gap-3 hover:border-cyan-500/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 shrink-0 bg-slate-800 rounded-md flex items-center justify-center text-slate-500 text-[9px] text-center">
                    IMG
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.name}
                      </h4>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-md whitespace-nowrap">
                        <Heart size={10} />
                        Wishlist
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{item.desc}</p>
                    <p className="text-xs font-semibold text-cyan-400 mb-2">
                      Price ${item.price.toFixed(2)}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                      <button className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors">
                        <FileText size={11} />
                        View Datasheet
                      </button>
                      {item.hasAlternatives && (
                        <button className="text-slate-300 hover:text-cyan-400 transition-colors">
                          Find Alternatives
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddWishlistToCart(item)}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-medium py-1 rounded-md transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button className="flex-1 bg-red-600/20 border border-red-500/40 hover:bg-red-600/30 text-red-400 text-[11px] font-medium py-1 rounded-md transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}