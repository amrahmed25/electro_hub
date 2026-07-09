import React, { useEffect, useState, useCallback } from "react";
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
  Loader2,
  AlertCircle,
} from "lucide-react";

// ------------------- API Config -------------------
const API_BASE_URL = "https://electrohub-zqtf85s5.b4a.run";

// TODO: confirm the exact localStorage key used elsewhere in the project after
// login/signup (auth response schema wasn't visible in the Swagger session).
// Falling back to a couple of common names for now.
function getAuthToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    null
  );
}

async function apiFetch(endpoint, options = {}) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.message || message;
    } catch (_) {
      // response had no JSON body
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ------------------- Mock Data (kept — no matching endpoint in Swagger) -------------------
// No "/circuits", "/saved", or "/simulator" endpoint exists in the Swagger docs
// that were reviewed, so this section stays mocked until such an endpoint exists.
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

// ------------------- Badges -------------------
const DifficultyBadge = ({ level }) => {
  const styles = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  const cls =
    styles[level] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap border capitalize ${cls}`}
    >
      {level || "Unknown"}
    </span>
  );
};

// ------------------- Loading / Error / Empty helper -------------------
const SectionState = ({
  loading,
  error,
  empty,
  loadingText,
  emptyText,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm py-10">
        <Loader2 size={16} className="animate-spin" />
        {loadingText}
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-red-400 text-sm py-10 text-center">
        <AlertCircle size={18} />
        <span>{error}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs underline text-cyan-400 hover:text-cyan-300"
          >
            Try again
          </button>
        )}
      </div>
    );
  }
  if (empty) {
    return (
      <div className="text-center text-slate-500 text-sm py-10">
        {emptyText}
      </div>
    );
  }
  return null;
};

// ------------------- Main Component -------------------
export default function UserDashboard() {
  const { addItem } = useCart();

  // ---- Generated Projects state ----
  // NOTE: Swagger only exposes GET /projects (public "featured projects" list,
  // paginated) and GET /projects/{id} (details + total cost). There is no
  // user-scoped "my generated projects" endpoint, so this column currently shows
  // the featured projects list. "status" (Completed/In Progress) and component
  // count aren't part of the /projects response, so difficultyLevel is shown
  // instead and the description is used in place of a component count.
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [addingProjectId, setAddingProjectId] = useState(null);

  // ---- Wishlist state ----
  // NOTE: the Wishlist section of the Swagger docs wasn't fully accessible —
  // only AddToWishlistDto { componentId } was confirmed. GET /wishlist,
  // POST /wishlist and DELETE /wishlist/{componentId} below follow REST
  // convention and match the DTO, but should be double-checked against the
  // docs once reachable.
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistError, setWishlistError] = useState(null);
  const [addingWishlistId, setAddingWishlistId] = useState(null);
  const [removingWishlistId, setRemovingWishlistId] = useState(null);

  const loadProjects = useCallback(async () => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const res = await apiFetch("/projects?page=1&limit=10");
      setProjects(res?.data?.items ?? []);
    } catch (err) {
      setProjectsError(err.message || "Failed to load projects.");
    } finally {
      setProjectsLoading(false);
    }
  }, []);

  const loadWishlist = useCallback(async () => {
    setWishlistLoading(true);
    setWishlistError(null);
    try {
      const res = await apiFetch("/wishlist");
      const rawItems = res?.data?.items ?? res?.data ?? res?.items ?? res ?? [];
      const normalized = (Array.isArray(rawItems) ? rawItems : []).map(
        (raw) => {
          const component = raw.component ?? raw;
          return {
            wishlistId: raw.id ?? component.id,
            componentId: raw.componentId ?? component.id,
            name: component.name ?? "Unnamed Component",
            desc: component.description ?? "",
            price: Number(component.price ?? 0),
            hasAlternatives: false,
          };
        }
      );
      setWishlist(normalized);
    } catch (err) {
      setWishlistError(err.message || "Failed to load wishlist.");
    } finally {
      setWishlistLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
    loadWishlist();
  }, [loadProjects, loadWishlist]);

  // Wishlist item -> Cart
  const handleAddWishlistToCart = async (item) => {
    setAddingWishlistId(item.wishlistId);
    try {
      await apiFetch("/cart", {
        method: "POST",
        body: JSON.stringify({ componentId: item.componentId, quantity: 1 }),
      });
      addItem({
        id: item.componentId,
        name: item.name,
        manufacturer: item.desc,
        price: item.price,
        image: null,
      });
    } catch (err) {
      alert(err.message || "Failed to add item to cart.");
    } finally {
      setAddingWishlistId(null);
    }
  };

  const handleRemoveFromWishlist = async (item) => {
    setRemovingWishlistId(item.wishlistId);
    try {
      await apiFetch(`/wishlist/${item.componentId}`, { method: "DELETE" });
      setWishlist((prev) =>
        prev.filter((w) => w.wishlistId !== item.wishlistId)
      );
    } catch (err) {
      alert(err.message || "Failed to remove item from wishlist.");
    } finally {
      setRemovingWishlistId(null);
    }
  };

  // Generated Project -> Cart (adds every component of the project)
  const handleAddProjectToCart = async (project) => {
    setAddingProjectId(project.id);
    try {
      const details = await apiFetch(`/projects/${project.id}`);
      const components = details?.data?.components ?? details?.components ?? [];
      if (components.length === 0) {
        throw new Error("This project has no components to add.");
      }
      await Promise.all(
        components.map((c) =>
          apiFetch("/cart", {
            method: "POST",
            body: JSON.stringify({
              componentId: c.componentId ?? c.id,
              quantity: c.quantityNeeded ?? 1,
            }),
          })
        )
      );
      addItem({
        id: project.id,
        name: project.name,
        manufacturer: `${components.length} Components`,
        price: details?.data?.totalCost ?? details?.totalCost ?? 0,
        image: null,
      });
    } catch (err) {
      alert(err.message || "Failed to add project components to cart.");
    } finally {
      setAddingProjectId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-200">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white mb-6">
          ELECTROHUB | USER DASHBOARD
        </h1>

        {/* Profile Card — static: no /users endpoint was confirmed in the docs */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ---------------- Column 1: Saved Logic Circuits (mock — no endpoint) ---------------- */}
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

          {/* ---------------- Column 2: Generated Projects (GET /projects) ---------------- */}
          <section>
            <h3 className="text-base font-semibold text-white mb-3">
              Generated Projects{" "}
              <span className="text-slate-500 font-normal">(List)</span>
            </h3>
            <div className="flex flex-col gap-3">
              <SectionState
                loading={projectsLoading}
                error={projectsError}
                empty={!projectsLoading && !projectsError && projects.length === 0}
                loadingText="Loading projects..."
                emptyText="No projects yet."
                onRetry={loadProjects}
              />
              {!projectsLoading &&
                !projectsError &&
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#0b1526] border border-cyan-900/30 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {project.name}
                      </h4>
                      <DifficultyBadge level={project.difficultyLevel} />
                    </div>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            project.tinkercadUrl || project.youtubeUrl || "#",
                            "_blank"
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-1 border border-slate-600 hover:border-cyan-500 text-slate-200 text-xs font-medium py-1.5 rounded-md transition-colors"
                      >
                        <Eye size={13} />
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddProjectToCart(project)}
                        disabled={addingProjectId === project.id}
                        className="flex-1 flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white text-xs font-medium py-1.5 rounded-md transition-colors"
                      >
                        {addingProjectId === project.id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <ShoppingCart size={13} />
                        )}
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* ---------------- Column 3: Component Wishlist (GET/POST/DELETE /wishlist) ---------------- */}
          <section>
            <h3 className="text-base font-semibold text-white mb-3">
              Component Wishlist{" "}
              <span className="text-slate-500 font-normal">(List)</span>
            </h3>
            <div className="flex flex-col gap-3">
              <SectionState
                loading={wishlistLoading}
                error={wishlistError}
                empty={!wishlistLoading && !wishlistError && wishlist.length === 0}
                loadingText="Loading wishlist..."
                emptyText="Your wishlist is empty."
                onRetry={loadWishlist}
              />
              {!wishlistLoading &&
                !wishlistError &&
                wishlist.map((item) => (
                  <div
                    key={item.wishlistId}
                    className="bg-[#0b1526] border border-cyan-900/30 rounded-lg p-3 flex gap-3 hover:border-cyan-500/50 transition-colors"
                  >
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
                          disabled={addingWishlistId === item.wishlistId}
                          className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 text-white text-[11px] font-medium py-1 rounded-md transition-colors"
                        >
                          {addingWishlistId === item.wishlistId
                            ? "Adding..."
                            : "Add to Cart"}
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item)}
                          disabled={removingWishlistId === item.wishlistId}
                          className="flex-1 bg-red-600/20 border border-red-500/40 hover:bg-red-600/30 disabled:opacity-60 text-red-400 text-[11px] font-medium py-1 rounded-md transition-colors"
                        >
                          {removingWishlistId === item.wishlistId
                            ? "Removing..."
                            : "Remove"}
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