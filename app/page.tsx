"use client";

import { Button } from "@/components/common/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Users,
  Globe,
  Shield,
  DollarSign,
  BarChart3,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Trophy,
  Clock,
  HeartHandshake,
  MapPin,
  ChevronRight,
  Quote,
  Plane,
  Camera,
  Calendar,
  Search,
  Filter,
  Heart,
  ThumbsUp,
  Award,
  Compass,
  Mountain,
  Waves,
  TreePine,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("adventures");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExplore = () => {
    if (session) {
      router.push("/trips");
    } else {
      router.push("/auth/signin");
    }
  };

  const stats = [
    { value: "100+", label: "Destinations", icon: Globe },
    { value: "50+", label: "Happy Travelers", icon: Users },
    { value: "4.9★", label: "Average Rating", icon: Star },
    { value: "20+", label: "Trusted Vendors", icon: Shield },
  ];

  const categories = [
    {
      id: "adventures",
      icon: Mountain,
      title: "Adventures",
      description: "Thrilling outdoor experiences",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "cultural",
      icon: Camera,
      title: "Cultural Tours",
      description: "Discover local traditions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "relaxation",
      icon: Waves,
      title: "Beach & Relax",
      description: "Peaceful getaways",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "nature",
      icon: TreePine,
      title: "Nature Trails",
      description: "Explore pristine wilderness",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const features = [
    {
      icon: Search,
      title: "Easy Discovery",
      description: "Find your perfect trip with our smart search and filters",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Verified Vendors",
      description: "All our travel partners are thoroughly vetted and verified",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation and travel documents",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: HeartHandshake,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your peace of mind",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description:
        "We guarantee you the best prices or we'll match the difference",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const featuredDestinations = [
    {
      name: "Santorini, Greece",
      image: "🏛️",
      price: "$299",
      duration: "3 Days",
      rating: 4.8,
      reviews: 124,
      type: "Cultural",
    },
    {
      name: "Bali, Indonesia",
      image: "🏖️",
      price: "$199",
      duration: "5 Days",
      rating: 4.9,
      reviews: 98,
      type: "Beach & Relax",
    },
    {
      name: "Swiss Alps",
      image: "⛰️",
      price: "$449",
      duration: "4 Days",
      rating: 4.7,
      reviews: 156,
      type: "Adventure",
    },
    {
      name: "Amazon Rainforest",
      image: "🌿",
      price: "$399",
      duration: "6 Days",
      rating: 4.9,
      reviews: 87,
      type: "Nature",
    },
  ];

  const testimonials = [
    {
      name: "Emma Johnson",
      role: "Travel Enthusiast",
      content:
        "Explorify made planning my dream vacation effortless. The platform is intuitive and the experiences are incredible!",
      rating: 5,
      image: "EJ",
      location: "Bali Trip",
    },
    {
      name: "David Chen",
      role: "Adventure Seeker",
      content:
        "Found the most amazing hiking trails through Explorify. The local guides were knowledgeable and the entire experience was seamless.",
      rating: 5,
      image: "DC",
      location: "Swiss Alps Adventure",
    },
    {
      name: "Sofia Rodriguez",
      role: "Cultural Explorer",
      content:
        "The cultural tours in Greece were phenomenal! Every detail was perfectly planned and the memories will last forever.",
      rating: 5,
      image: "SR",
      location: "Santorini Experience",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Search & Discover",
      description: "Browse thousands of curated travel experiences",
    },
    {
      number: "02",
      title: "Compare & Choose",
      description: "Compare prices, reviews, and itineraries",
    },
    {
      number: "03",
      title: "Book Securely",
      description: "Complete your booking with secure payment",
    },
    {
      number: "04",
      title: "Travel & Enjoy",
      description: "Embark on your unforgettable journey",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Trusted by {stats[1].value} travelers worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-down">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore the World
            </span>
            <br />
            <span className="text-foreground">Your Way</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Discover amazing destinations, book unique experiences, and create
            unforgettable memories with trusted local vendors.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
            <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-full p-2 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex items-center gap-3 px-4 border-l border-border/30">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">When?</span>
                </div>
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button
              size="lg"
              onClick={handleExplore}
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Compass className="w-5 h-5 mr-2" />
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg hover:bg-accent/50 transition-all duration-200"
            >
              Watch How It Works
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Adventure
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover experiences tailored to your interests
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`
                    relative group cursor-pointer transition-all duration-300
                    ${
                      activeTab === category.id
                        ? "scale-105"
                        : "hover:scale-105"
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300`}
                  />
                  <div
                    className={`
                    relative h-full bg-background/60 backdrop-blur-xl border rounded-2xl p-8 text-center transition-all duration-300
                    ${
                      activeTab === category.id
                        ? "border-primary/50 bg-primary/5"
                        : "border-border/50 hover:border-primary/50"
                    }
                  `}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 mx-auto`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-muted-foreground">
              Handpicked experiences from around the globe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-6xl">
                    {destination.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {destination.type}
                      </span>
                      <button className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{destination.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({destination.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">
                          {destination.price}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /{destination.duration}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-5 h-5 text-primary transition-transform ${
                          hoveredCard === index ? "translate-x-2" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-3 hover:bg-accent/50 transition-all duration-200"
            >
              View All Destinations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Explorify?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for the perfect trip
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index + 10)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300`}
                  />
                  <div className="relative h-full bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center text-primary font-medium">
                      Learn more
                      <ArrowRight
                        className={`w-4 h-4 ml-2 transition-transform ${
                          hoveredCard === index + 10 ? "translate-x-2" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Your journey in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Traveler Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              What our community says about their experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-lg mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-border/50 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Next
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Adventure?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of travelers who have discovered their perfect
              getaway through Explorify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleExplore}
                className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                {session ? "Explore Trips" : "Get Started"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/vendor">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg hover:bg-accent/50 transition-all duration-200"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Become a Vendor
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Free to browse</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Secure booking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
