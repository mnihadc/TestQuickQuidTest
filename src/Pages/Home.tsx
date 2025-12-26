import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  Shield,
  Users,
  Briefcase,
  DollarSign,
  Mail,
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
  Building2, // Changed from Building
} from "lucide-react";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle email submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Animation variants - Fixed for Framer Motion v10+
  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Fixed floating particles positions - Moved to useMemo
  const particles = useMemo(() => {
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
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-white font-sans overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Main gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15)_0%,rgba(255,255,255,0)_70%)]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

        {/* Animated orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-l from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            initial={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: [null, particle.targetX],
              y: [null, particle.targetY],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse" as const,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-poppins tracking-tight">
                QuickQuid
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["home", "about", "how-it-works", "features"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item)}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group capitalize"
                  >
                    {item.replace(/-/g, " ")}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full" />
                  </motion.button>
                )
              )}

              {/* Waitlist Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollToSection("waitlist")}
                className="px-6 py-2.5 border-2 border-blue-600 text-blue-400 rounded-full font-semibold text-sm hover:bg-blue-600/10 transition-all duration-300 group flex items-center space-x-2"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {["home", "about", "how-it-works", "features"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-medium capitalize"
                  >
                    {item.replace(/-/g, " ")}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("waitlist")}
                  className="w-full mt-4 py-3.5 border-2 border-blue-600 text-blue-400 rounded-full font-semibold hover:bg-blue-600/10 transition-all duration-300"
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 px-6 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-300">
                For Students, By Students
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  The Operating System
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift">
                    for the Student Economy
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-xl sm:text-2xl text-blue-400 font-semibold mb-6">
                Trusted. Verified. Local.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-3xl">
                Students deserve a safe, fair platform to earn real money
                without paying commissions. QuickQuid connects verified college
                students with alumni, local businesses, and peers for skills,
                tutoring, products, and team opportunities all in one place.
              </p>
            </motion.div>

            {/* Highlight Card */}
            <motion.div variants={scaleIn} className="max-w-3xl mb-12">
              <div className="bg-white/5 backdrop-blur-sm border-l-4 border-blue-600 rounded-xl p-8">
                <p className="text-xl font-semibold text-white">
                  Earn 100% of your money. Build your reputation. Get
                  discovered.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button
                onClick={() => scrollToSection("waitlist")}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Join Your College Waitlist
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="px-8 py-4 border-2 border-blue-600 text-blue-400 rounded-full font-semibold hover:bg-blue-600/10 transition-all hover:-translate-y-1"
              >
                See How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-500">Scroll to explore</span>
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold font-poppins mb-6 relative inline-block"
              >
                About QuickQuid
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                A college-only marketplace built to power local student
                economies
              </motion.p>
            </div>

            {/* About Content */}
            <motion.div variants={scaleIn} className="relative group">
              <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl p-12 shadow-2xl border-l-4 border-blue-600">
                <p className="text-lg text-gray-400 leading-relaxed">
                  QuickQuid enables verified students to turn skills, knowledge,
                  and initiative into real opportunities—without commissions or
                  platform complexity. By creating a trusted, campus-focused
                  ecosystem, we empower students to monetize their talents,
                  collaborate with peers, and build professional reputations
                  from day one.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-32 relative bg-gradient-to-br from-blue-900/10 via-blue-900/5 to-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold font-poppins mb-6 relative inline-block"
              >
                How It Works
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Get started in three simple steps
              </motion.p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Verify Your College",
                  description:
                    "Join with your college email and become part of your trusted campus community. Verification ensures a safe environment for all users.",
                  icon: Shield,
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  number: "02",
                  title: "List or Discover Opportunities",
                  description:
                    "Post skills, tutoring services, products, or browse what others offer. Connect with peers, alumni, and local businesses directly.",
                  icon: Briefcase,
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  number: "03",
                  title: "Earn & Build Reputation",
                  description:
                    "Keep 100% of what you earn and grow your profile with verified reviews and ratings from your campus community.",
                  icon: DollarSign,
                  gradient: "from-emerald-500 to-green-500",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group relative"
                >
                  <div className="absolute -top-4 left-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg z-10">
                    {step.number}
                  </div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8 pt-12 hover:border-blue-500/30 transition-all duration-500 h-full group-hover:-translate-y-2">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold font-poppins mb-6 relative inline-block"
              >
                What You Can Do on QuickQuid
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                A complete platform for student opportunities
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Laptop,
                  title: "Sell Skills",
                  desc: "Offer design, coding, writing, or any specialized talent to peers and local businesses.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: BookOpen,
                  title: "Tutor Peers",
                  desc: "Teach subjects you excel at and earn while helping classmates succeed academically.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: ShoppingBag,
                  title: "Sell Products",
                  desc: "List textbooks, electronics, handmade items, or any products with campus delivery.",
                  gradient: "from-emerald-500 to-green-500",
                },
                {
                  icon: Users,
                  title: "Find Teammates",
                  desc: "Connect for class projects, startups, clubs, or study groups with verified students.",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: Handshake,
                  title: "Work with Alumni",
                  desc: "Access mentorship, internships, and freelance opportunities from trusted alumni.",
                  gradient: "from-yellow-500 to-amber-500",
                },
                {
                  icon: Building2, // Changed from Building
                  title: "Local Business Gigs",
                  desc: "Find part-time work, event staffing, and project-based opportunities from local businesses.",
                  gradient: "from-indigo-500 to-purple-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 h-full group-hover:-translate-y-1 border-t-4 border-t-transparent group-hover:border-t-blue-500">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold font-poppins text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why QuickQuid Section */}
      <section className="py-32 relative bg-gradient-to-br from-blue-900/10 via-blue-900/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold font-poppins mb-6 relative inline-block"
              >
                Why Choose QuickQuid?
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Built specifically for the needs of college students
              </motion.p>
            </div>

            {/* Why Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                {
                  icon: Percent,
                  title: "No Commissions",
                  desc: "Keep 100% of what you earn. We believe your money should stay in your pocket, not ours.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: UserCheck,
                  title: "Verified Students Only",
                  desc: "Everyone is verified with a college email, creating a trusted, secure campus community.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: MapPin,
                  title: "Campus-Focused",
                  desc: "All opportunities are local to your campus, making transactions and collaboration easy.",
                  gradient: "from-emerald-500 to-green-500",
                },
                {
                  icon: Shield,
                  title: "Safer Platform",
                  desc: "No random DMs or scams. All interactions happen within our secure, moderated platform.",
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group relative"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 h-full">
                    <h3 className="text-xl font-bold font-poppins text-white mb-3 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${reason.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <reason.icon className="w-5 h-5 text-white" />
                      </div>
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 ml-13">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Week One Promise Section */}
      <section className="py-32 relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold font-poppins mb-8"
            >
              Our Week-One Promise
            </motion.h2>
            <motion.div
              variants={scaleIn}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12"
            >
              <p className="text-2xl md:text-3xl font-medium italic leading-relaxed text-white">
                "If students don't earn, learn, or connect within their first
                week on QuickQuid, the platform has failed."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-8"
            >
              Your Skills Already Have Value
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Now give them the right marketplace. Join thousands of students
              who are already building their campus economy.
            </motion.p>

            {/* Email Form */}
            <motion.form
              variants={scaleIn}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300"
                >
                  {isSubmitted ? "Joined! 🎉" : "Join the QuickQuid Waitlist"}
                </motion.button>
              </div>
            </motion.form>

            {/* Additional CTA Button */}
            <motion.button
              variants={fadeInUp}
              onClick={() => scrollToSection("waitlist")}
              className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              Join Your College Waitlist
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                QuickQuid
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Support
              </a>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-800 w-full text-center">
              <p className="text-sm text-gray-500">
                © 2025 QuickQuid. All rights reserved. Built for students, by
                students.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles - Fixed for React 18+ */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
          
          @keyframes gradientShift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .animate-gradient-shift {
            animation: gradientShift 3s ease infinite;
            background-size: 200% 200%;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
