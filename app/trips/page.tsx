"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/button";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  ArrowRight,
  Grid3X3,
  List,
  Compass,
  Mountain,
  Camera,
  Waves,
  TreePine,
  Shield,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface Trip {
  planId: string;
  vendorId: string;
  name: string;
  image: string;
  route: string[];
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export default function TripsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    {
      id: "all",
      name: "All Trips",
      icon: Compass,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: "adventure",
      name: "Adventure",
      icon: Mountain,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "cultural",
      name: "Cultural",
      icon: Camera,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "beach",
      name: "Beach & Relax",
      icon: Waves,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "nature",
      name: "Nature",
      icon: TreePine,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/plans");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch trips`);
      }

      const data = await response.json();
      setTrips(data.plans || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = trips.filter((trip) => {
    if (!searchQuery) return true;
    return (
      trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.some((location) =>
        location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const toggleFavorite = (tripId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(tripId)) {
      newFavorites.delete(tripId);
    } else {
      newFavorites.add(tripId);
    }
    setFavorites(newFavorites);
  };

  const handleBookTrip = (tripId: string) => {
    if (!session) {
      router.push("/auth/signin?callbackUrl=/trips");
      return;
    }
    router.push(`/trips/${tripId}/book`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={fetchTrips}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {filteredTrips.length} amazing trips available
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-down">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Discover Amazing
              </span>
              <br />
              <span className="text-foreground">Travel Experiences</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Browse through our curated collection of unforgettable journeys
              and find your next adventure.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 animate-scale-in">
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-2 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3 px-4">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search destinations, experiences..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-2 pr-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-xl"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-xl"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 hover:scale-105
                    bg-background/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 hover:shadow-lg
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Results */}
          {filteredTrips.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No trips found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try adjusting your search terms or browse all available trips."
                  : "No trips are currently available. Check back soon!"}
              </p>
              {searchQuery && (
                <Button onClick={() => setSearchQuery("")}>
                  Show All Trips
                </Button>
              )}
            </div>
          ) : (
            <div
              className={`
                grid gap-6
                ${
                  viewMode === "grid"
                    ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 max-w-4xl mx-auto"
                }
              `}
            >
              {filteredTrips.map((trip, index) => (
                <div
                  key={trip.planId}
                  onMouseEnter={() => setHoveredCard(trip.planId)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`
                    relative group cursor-pointer transition-all duration-300 animate-scale-in
                    ${viewMode === "list" ? "flex gap-6" : ""}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  <div
                    className={`
                      relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden
                      hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                      ${viewMode === "list" ? "flex-1" : ""}
                    `}
                  >
                    {/* Image */}
                    <div
                      className={`
                        relative bg-gradient-to-br from-blue-500/20 to-purple-600/20
                        ${viewMode === "list" ? "w-80 h-48" : "aspect-video"}
                      `}
                    >
                      {trip.image ? (
                        <img
                          src={trip.image}
                          alt={trip.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          🏞️
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(trip.planId);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg"
                      >
                        <Heart
                          className={`
                            w-5 h-5 transition-colors duration-200
                            ${
                              favorites.has(trip.planId)
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground hover:text-red-500"
                            }
                          `}
                        />
                      </button>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-background/90 backdrop-blur-xl border border-border/50 rounded-full px-4 py-2 shadow-lg">
                          <span className="text-xl font-bold text-primary">
                            ${trip.price}
                          </span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-full px-3 py-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-200 mb-2">
                          {trip.name}
                        </h3>

                        {/* Route */}
                        {trip.route && trip.route.length > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground font-medium">
                              {trip.route.join(" → ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                        {trip.description}
                      </p>

                      {/* Features */}
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">3-5 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Max 8</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      </div>

                      {/* Book Button */}
                      <Button
                        onClick={() => handleBookTrip(trip.planId)}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 py-3 text-lg font-semibold"
                      >
                        {session ? "Book This Experience" : "Sign in to Book"}
                        <ArrowRight
                          className={`
                            w-5 h-5 ml-2 transition-transform duration-200
                            ${
                              hoveredCard === trip.planId ? "translate-x-2" : ""
                            }
                          `}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredTrips.length > 0 && filteredTrips.length >= 12 && (
            <div className="text-center mt-16">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-4 text-lg hover:bg-accent/50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Discover More Adventures
                <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          {filteredTrips.length > 0 && (
            <div className="text-center mt-20">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let us help you create a custom travel experience tailored
                  just for you.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-3 hover:bg-accent/50 transition-all duration-200"
                >
                  Request Custom Trip
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
