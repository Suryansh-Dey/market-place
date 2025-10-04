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
  Briefcase,
  ChevronRight,
  Quote
} from "lucide-react";
import { useState, useEffect } from "react";

export default function VendorLandingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (session) {
      router.push("/vendor/dashboard");
    } else {
      router.push("/auth/signin?vendor=1");
    }
  };

  const stats = [
    { value: "20+", label: "Active Vendors", icon: Users },
    { value: "50+", label: "Happy Travelers", icon: Globe },
    { value: "90%", label: "Satisfaction Rate", icon: Star },
    { value: "5+", label: "Regions Unlocked", icon: TrendingUp },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track your performance with detailed insights and real-time data",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid instantly with our secure payment processing system",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Access millions of travelers from around the world",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Instant Bookings",
      description: "Automated booking system that works 24/7 for you",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: HeartHandshake,
      title: "24/7 Support",
      description: "Dedicated support team to help you succeed",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Trophy,
      title: "Rewards Program",
      description: "Earn more with our tiered commission structure",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Adventure Tour Operator",
      content: "Explorify transformed my small tour business into a thriving enterprise. The platform's reach is incredible!",
      rating: 5,
      image: "SC",
    },
    {
      name: "Marco Rodriguez",
      role: "Local Guide",
      content: "The analytics tools help me understand my customers better. I've doubled my bookings in just 6 months.",
      rating: 5,
      image: "MR",
    },
    {
      name: "Priya Sharma",
      role: "Travel Agency Owner",
      content: "Best decision I ever made! The support team is amazing and the platform is so easy to use.",
      rating: 5,
      image: "PS",
    },
  ];

  const steps = [
    { number: "01", title: "Sign Up", description: "Create your vendor account in minutes" },
    { number: "02", title: "List Your Services", description: "Add your travel packages and experiences" },
    { number: "03", title: "Get Discovered", description: "Reach millions of potential customers" },
    { number: "04", title: "Grow Your Business", description: "Watch your revenue soar" },
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
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join {stats[0].value} successful vendors</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-down">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grow Your Travel
            </span>
            <br />
            <span className="text-foreground">Business with Explorify</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Connect with millions of travelers worldwide. List your tours, experiences, and accommodations on our platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Sign Up as a Vendor!
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg hover:bg-accent/50 transition-all duration-200"
            >
              Watch Demo
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
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground">Powerful tools designed to help you grow</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300 ${feature.gradient}" />
                  <div className="relative h-full bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <div className="mt-6 flex items-center text-primary font-medium">
                      Learn more
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${hoveredCard === index ? 'translate-x-2' : ''}`} />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in just 4 simple steps</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">Hear from our thriving vendor community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-lg mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
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
              Ready to Start Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of successful vendors and transform your travel business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                {session ? "Go to Dashboard" : "Create Vendor Account"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg hover:bg-accent/50 transition-all duration-200"
              >
                <Clock className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Cancel anytime</span>
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
