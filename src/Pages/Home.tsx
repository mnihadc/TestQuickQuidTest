import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Rocket,
  Phone,
  Mail,
  Instagram,
  ArrowRight,
  Menu,
  X,
  Laptop,
  BookOpen,
  ShoppingBag,
  Handshake,
  MapPin,
  Percent,
  UserCheck,
  Building2,
  DollarSign,
  Briefcase,
  Globe,
  Zap,
  Target,
  Award,
  ShieldCheck,
  CheckCircle,
  Loader2,
  Clock,
  Users,
} from "lucide-react";

// Optimized particle generation
const generateParticles = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    targetX: Math.random() * 200 - 100,
    targetY: Math.random() * 200 - 100,
    duration: Math.random() * 20 + 10,
  }));
};

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">Q</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-40" />
      </div>
      <p className="text-gray-400 mt-4">Loading QuickQuid...</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Track sections in view
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { margin: "-50%" });
  const storyInView = useInView(storyRef, { margin: "-50%" });
  const howItWorksInView = useInView(howItWorksRef, { margin: "-50%" });
  const featuresInView = useInView(featuresRef, { margin: "-50%" });
  const contactInView = useInView(contactRef, { margin: "-50%" });
  const waitlistInView = useInView(waitlistRef, { margin: "-50%" });

  // Update active section
  useEffect(() => {
    if (heroInView) setActiveSection("hero");
    else if (storyInView) setActiveSection("story");
    else if (howItWorksInView) setActiveSection("how-it-works");
    else if (featuresInView) setActiveSection("features");
    else if (contactInView) setActiveSection("contact");
    else if (waitlistInView) setActiveSection("waitlist");
  }, [
    heroInView,
    storyInView,
    howItWorksInView,
    featuresInView,
    contactInView,
    waitlistInView,
  ]);

  // Smooth scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const y1 = useTransform(smoothScrollProgress, [0, 1], [0, 50]);
  const y2 = useTransform(smoothScrollProgress, [0, 1], [0, -50]);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubmitted(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  // Open Instagram link
  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/quickquid.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Animation variants with proper easing types
  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const slideIn = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Optimized particles
  const particles = useMemo(() => generateParticles(), []);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-white font-sans overflow-x-hidden"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 z-50 origin-left"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-l from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
            initial={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              x: 0,
              y: 0,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-poppins">
                  QuickQuid
                </span>
                <span className="text-xs text-gray-400">
                  Student Economy Platform
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: "Home", id: "hero" },
                { label: "Story", id: "story" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Features", id: "features" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}

              <div className="flex items-center space-x-4 pl-6 border-l border-white/10">
                <a
                  href="tel:7356362802"
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>7356362802</span>
                </a>

                <button
                  onClick={() => scrollToSection("waitlist")}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Join Waitlist
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {[
                  { label: "Home", id: "hero" },
                  { label: "Story", id: "story" },
                  { label: "How It Works", id: "how-it-works" },
                  { label: "Features", id: "features" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-medium"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-white/10 space-y-4">
                  <a
                    href="tel:7356362802"
                    className="flex items-center space-x-3 py-3 px-4 text-gray-300 hover:text-blue-400"
                  >
                    <Phone className="w-5 h-5" />
                    <span>7356362802</span>
                  </a>

                  <a
                    href="mailto:contact@quickquid.in"
                    className="flex items-center space-x-3 py-3 px-4 text-gray-300 hover:text-blue-400"
                  >
                    <Mail className="w-5 h-5" />
                    <span>contact@quickquid.in</span>
                  </a>

                  <button
                    onClick={openInstagram}
                    className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 flex items-center justify-center gap-3"
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </button>

                  <button
                    onClick={() => scrollToSection("waitlist")}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    Join Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center pt-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 px-6 py-2 rounded-full mb-8"
            >
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">
                Revolutionizing Student Economy
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                  The Ultimate Platform for
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Student Entrepreneurs
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-12 max-w-3xl">
              <p className="text-xl sm:text-2xl text-blue-400 font-semibold mb-6">
                Zero Commission · Verified Community · Real Opportunities
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                QuickQuid empowers college students to monetize their skills,
                connect with local opportunities, and build professional
                networks—all while keeping 100% of their earnings in a secure,
                campus-verified ecosystem.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "100%", label: "No Commission" },
                { value: "24/7", label: "Secure Platform" },
                { value: "100%", label: "Verified Users" },
                { value: "0 Fees", label: "Transaction" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="text-xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("waitlist")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="px-8 py-4 border-2 border-blue-600 text-blue-400 rounded-full font-semibold hover:bg-blue-600/10 transition-all duration-300"
              >
                How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} id="story" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                Our <span className="text-blue-400">Story</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                From Campus Frustration to Student Empowerment
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          The Vision
                        </h3>
                        <p className="text-gray-400">
                          We saw talented students struggling to monetize their
                          skills while traditional platforms took huge
                          commissions. QuickQuid was born to create a fair,
                          student-first ecosystem.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Our Mission
                        </h3>
                        <p className="text-gray-400">
                          To empower every student to become an entrepreneur,
                          connecting them with peers, alumni, and local
                          businesses in a trusted, commission-free environment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Why We Exist
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Students deserve better. Better opportunities, better
                    compensation, and better support. QuickQuid bridges the gap
                    between academic potential and real-world success, creating
                    sustainable campus economies.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "0%", label: "Commission" },
                    { value: "100%", label: "Verified" },
                    { value: "24/7", label: "Support" },
                    { value: "Secure", label: "Payments" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        id="how-it-works"
        className="py-20 relative bg-gradient-to-b from-blue-900/5 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                How It <span className="text-purple-400">Works</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Start earning in four simple steps
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  number: "01",
                  title: "Sign Up",
                  description:
                    "Verify with your college email to join the campus community",
                  icon: UserCheck,
                  gradient: "from-blue-600 to-cyan-600",
                },
                {
                  number: "02",
                  title: "Create Profile",
                  description: "Showcase your skills, expertise, and interests",
                  icon: Briefcase,
                  gradient: "from-purple-600 to-pink-600",
                },
                {
                  number: "03",
                  title: "Find Opportunities",
                  description: "Browse listings or create your own services",
                  icon: Globe,
                  gradient: "from-emerald-600 to-green-600",
                },
                {
                  number: "04",
                  title: "Earn & Grow",
                  description: "Keep 100% earnings and build your reputation",
                  icon: DollarSign,
                  gradient: "from-orange-600 to-red-600",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="group"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 h-full">
                    <div className="absolute -top-3 left-6 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-6 mt-4`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                Platform <span className="text-cyan-400">Features</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Everything you need to succeed in the student economy
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Laptop,
                  title: "Skill Marketplace",
                  desc: "Monetize your expertise in design, coding, writing, and more",
                  gradient: "from-blue-600 to-cyan-600",
                },
                {
                  icon: BookOpen,
                  title: "Academic Tutoring",
                  desc: "Help peers succeed while earning competitive rates",
                  gradient: "from-purple-600 to-pink-600",
                },
                {
                  icon: ShoppingBag,
                  title: "Campus Commerce",
                  desc: "Buy and sell textbooks, electronics, and goods within campus",
                  gradient: "from-emerald-600 to-green-600",
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  desc: "Find teammates for projects and startups",
                  gradient: "from-orange-600 to-red-600",
                },
                {
                  icon: Handshake,
                  title: "Alumni Network",
                  desc: "Connect with alumni for mentorship and opportunities",
                  gradient: "from-yellow-600 to-amber-600",
                },
                {
                  icon: Building2,
                  title: "Local Partnerships",
                  desc: "Access part-time jobs from trusted local businesses",
                  gradient: "from-indigo-600 to-purple-600",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="group"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 h-full">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative bg-gradient-to-b from-blue-900/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                Why Choose <span className="text-blue-400">QuickQuid</span>?
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  icon: Percent,
                  title: "Zero Commission",
                  desc: "Keep 100% of your earnings. No hidden fees or platform cuts.",
                  gradient: "from-blue-600 to-cyan-600",
                },
                {
                  icon: ShieldCheck,
                  title: "Verified Community",
                  desc: "Every user is verified with college credentials for safety.",
                  gradient: "from-purple-600 to-pink-600",
                },
                {
                  icon: MapPin,
                  title: "Campus Focused",
                  desc: "Designed specifically for campus ecosystems and local opportunities.",
                  gradient: "from-emerald-600 to-green-600",
                },
                {
                  icon: Award,
                  title: "Build Reputation",
                  desc: "Grow your professional profile with verified reviews and ratings.",
                  gradient: "from-orange-600 to-red-600",
                },
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="group"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 h-full">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${reason.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <reason.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {reason.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{reason.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                Get In <span className="text-purple-400">Touch</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Have questions? We're here to help
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone Number</p>
                        <a
                          href="tel:7356362802"
                          className="text-lg font-semibold text-white hover:text-blue-400"
                        >
                          7356362802
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email Address</p>
                        <a
                          href="mailto:contact@quickquid.in"
                          className="text-lg font-semibold text-white hover:text-blue-400"
                        >
                          contact@quickquid.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Social Media</p>
                        <button
                          onClick={openInstagram}
                          className="text-lg font-semibold text-white hover:text-pink-400 text-left"
                        >
                          @quickquid.in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Send a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@college.edu"
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us what you're looking for..."
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitted}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitted ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
        ref={waitlistRef}
        id="waitlist"
        className="py-20 relative bg-gradient-to-br from-blue-900/10 via-blue-900/5 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
            >
              Ready to <span className="text-blue-400">Start Earning</span>?
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Join thousands of students who are building their futures with
              QuickQuid
            </motion.p>

            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@college.edu"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitted ? "Joined! 🎉" : "Join Waitlist"}
                </button>
              </div>
            </motion.form>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {[
                { icon: CheckCircle, text: "No setup fees" },
                { icon: ShieldCheck, text: "Verified community" },
                { icon: Clock, text: "Priority access" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-2 text-gray-400"
                >
                  <item.icon className="w-5 h-5 text-green-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  QuickQuid
                </span>
                <span className="text-xs text-gray-500">
                  Student Economy Platform
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              {["Privacy", "Terms", "Contact", "Support", "Careers"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                )
              )}

              <button
                onClick={openInstagram}
                className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <a
                href="tel:7356362802"
                className="hover:text-blue-400 transition-colors"
              >
                📞 7356362802
              </a>
              <span className="hidden sm:block">•</span>
              <a
                href="mailto:contact@quickquid.in"
                className="hover:text-blue-400 transition-colors"
              >
                📧 contact@quickquid.in
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-800 w-full text-center">
              <p className="text-sm text-gray-500">
                © 2025 QuickQuid. Empowering students across campuses.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </motion.button>

      {/* Custom CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .animate-gradient-shift {
            animation: gradientShift 3s ease infinite;
            background-size: 200% 200%;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Selection color */
          ::selection {
            background: rgba(59, 130, 246, 0.3);
            color: white;
          }
          
          /* Responsive optimizations */
          @media (max-width: 640px) {
            h1 { font-size: 2.5rem; line-height: 1.2; }
            h2 { font-size: 2rem; }
            .container { padding-left: 1rem; padding-right: 1rem; }
          }
          
          /* Performance optimizations */
          .will-change-transform {
            will-change: transform;
          }
          
          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
