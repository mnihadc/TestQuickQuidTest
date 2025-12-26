import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold text-blue-600 font-poppins">
                QuickQuid
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="font-medium hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="font-medium hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="font-medium hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="font-medium hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("waitlist")}
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all hover:-translate-y-0.5"
              >
                Join Waitlist
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600 text-2xl"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-2 font-medium hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 font-medium hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left py-2 font-medium hover:text-blue-600 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left py-2 font-medium hover:text-blue-600 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("waitlist")}
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 pb-16 bg-gradient-to-br from-blue-50/50 to-blue-50/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold text-sm mb-6 shadow-md">
              For Students, By Students
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6">
              The Operating System for the Student Economy
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
              Trusted. Verified. Local.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Students deserve a safe, fair platform to earn real money without
              paying commissions. QuickQuid connects verified college students
              with alumni, local businesses, and peers for skills, tutoring,
              products, and team opportunities all in one place.
            </p>
            <div className="bg-white/70 p-6 rounded-xl border-l-4 border-blue-600 mb-10">
              <p className="text-xl font-semibold">
                Earn 100% of your money. Build your reputation. Get discovered.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("waitlist")}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Join Your College Waitlist
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all hover:-translate-y-1"
              >
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 relative inline-block">
              About QuickQuid
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              A college-only marketplace built to power local student economies
            </p>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border-l-4 border-blue-600">
              <p className="text-lg text-gray-600 leading-relaxed">
                QuickQuid enables verified students to turn skills, knowledge,
                and initiative into real opportunities—without commissions or
                platform complexity. By creating a trusted, campus-focused
                ecosystem, we empower students to monetize their talents,
                collaborate with peers, and build professional reputations from
                day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 relative inline-block">
              How It Works
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Verify Your College",
                description:
                  "Join with your college email and become part of your trusted campus community. Verification ensures a safe environment for all users.",
              },
              {
                number: "02",
                title: "List or Discover Opportunities",
                description:
                  "Post skills, tutoring services, products, or browse what others offer. Connect with peers, alumni, and local businesses directly.",
              },
              {
                number: "03",
                title: "Earn & Build Reputation",
                description:
                  "Keep 100% of what you earn and grow your profile with verified reviews and ratings from your campus community.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform relative"
              >
                <div className="absolute -top-4 left-8 w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold font-poppins mt-8 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 relative inline-block">
              What You Can Do on QuickQuid
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete platform for student opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Sell Skills",
                desc: "Offer design, coding, writing, or any specialized talent to peers and local businesses.",
              },
              {
                icon: "👨‍🏫",
                title: "Tutor Peers",
                desc: "Teach subjects you excel at and earn while helping classmates succeed academically.",
              },
              {
                icon: "🛍️",
                title: "Sell Products",
                desc: "List textbooks, electronics, handmade items, or any products with campus delivery.",
              },
              {
                icon: "👥",
                title: "Find Teammates",
                desc: "Connect for class projects, startups, clubs, or study groups with verified students.",
              },
              {
                icon: "🤝",
                title: "Work with Alumni",
                desc: "Access mentorship, internships, and freelance opportunities from trusted alumni.",
              },
              {
                icon: "🏢",
                title: "Local Business Gigs",
                desc: "Find part-time work, event staffing, and project-based opportunities from local businesses.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform border-t-4 border-transparent hover:border-blue-600"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold font-poppins mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why QuickQuid Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 relative inline-block">
              Why Choose QuickQuid?
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-600 rounded"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built specifically for the needs of college students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "💰",
                title: "No Commissions",
                desc: "Keep 100% of what you earn. We believe your money should stay in your pocket, not ours.",
              },
              {
                icon: "✅",
                title: "Verified Students Only",
                desc: "Everyone is verified with a college email, creating a trusted, secure campus community.",
              },
              {
                icon: "🏫",
                title: "Campus-Focused",
                desc: "All opportunities are local to your campus, making transactions and collaboration easy.",
              },
              {
                icon: "🛡️",
                title: "Safer Platform",
                desc: "No random DMs or scams. All interactions happen within our secure, moderated platform.",
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-transform"
              >
                <h3 className="text-xl font-bold font-poppins mb-3 flex items-center gap-3">
                  <span className="text-2xl">{reason.icon}</span>
                  {reason.title}
                </h3>
                <p className="text-gray-600">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week One Promise Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">
              Our Week-One Promise
            </h2>
            <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/20">
              <p className="text-2xl md:text-3xl font-medium italic leading-relaxed">
                "If students don't earn, learn, or connect within their first
                week on QuickQuid, the platform has failed."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              Your Skills Already Have Value
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Now give them the right marketplace. Join thousands of students
              who are already building their campus economy.
            </p>
            <button
              onClick={() => scrollToSection("waitlist")}
              className="px-10 py-5 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              Join the QuickQuid Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold font-poppins">QuickQuid</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
            <div className="pt-8 border-t border-gray-800 w-full text-center">
              <p className="text-gray-500 text-sm">
                © 2025 QuickQuid. All rights reserved. Built for students, by
                students.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
