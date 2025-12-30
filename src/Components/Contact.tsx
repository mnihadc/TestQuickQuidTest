import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Instagram,
  Loader2,
  CheckCircle,
  ShieldCheck,
  User,
  Rocket,
} from "lucide-react"; // Removed unused imports
import emailjs from "@emailjs/browser";

interface ContactProps {
  onInstagramClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onInstagramClick }) => {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isContactSending, setIsContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [isWaitlistSending, setIsWaitlistSending] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [waitlistCount, setWaitlistCount] = useState(1247);

  // Animation variants
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

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: "service_csgpkis",
    TEMPLATE_ID: "template_i1y19fv",
    WAITLIST_TEMPLATE_ID: "template_sc1jb0h",
    PUBLIC_KEY: "vDxgvRJ0Ybf1oNLSA",
    ADMIN_EMAIL: "contact@quickquid.in",
  };

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Handle Waitlist Submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!waitlistEmail || !waitlistEmail.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsWaitlistSending(true);
    setWaitlistStatus("idle");

    try {
      // Prepare waitlist email parameters
      const waitlistParams = {
        user_email: waitlistEmail,
        to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
        date: new Date().toLocaleString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
        waitlist_number: waitlistCount + 1,
        source: "QuickQuid Website",
        page_url: window.location.href,
        user_agent: navigator.userAgent.substring(0, 100), // First 100 chars
      };

      // Send waitlist email to admin
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.WAITLIST_TEMPLATE_ID || EMAILJS_CONFIG.TEMPLATE_ID,
        waitlistParams
      );

      // Success handling
      setWaitlistStatus("success");
      setWaitlistCount((prev) => prev + 1);
      setWaitlistEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setWaitlistStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("❌ Error sending waitlist email:", error);
      setWaitlistStatus("error");

      // Fallback: Send email via mailto
      const fallbackSubject = `New Waitlist Signup: ${waitlistEmail}`;
      const fallbackBody = `New waitlist signup received:\n\nEmail: ${waitlistEmail}\nDate: ${new Date().toLocaleString()}\n\n---\nQuickQuid Waitlist`;

      window.location.href = `mailto:${
        EMAILJS_CONFIG.ADMIN_EMAIL
      }?subject=${encodeURIComponent(
        fallbackSubject
      )}&body=${encodeURIComponent(fallbackBody)}`;

      setTimeout(() => {
        setWaitlistStatus("idle");
      }, 8000);
    } finally {
      setIsWaitlistSending(false);
    }
  };

  // Handle Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!contactForm.email || !contactForm.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    if (!contactForm.message.trim()) {
      alert("Please enter a message");
      return;
    }

    setIsContactSending(true);
    setContactStatus("idle");

    try {
      // Get additional user info
      const userInfo = {
        ip_address: "Not available",
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
      };

      // Prepare email parameters
      const templateParams = {
        from_name: contactForm.name.trim() || "Anonymous User",
        from_email: contactForm.email,
        to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
        reply_to: contactForm.email,
        message: contactForm.message,
        date: new Date().toLocaleString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
        user_email: contactForm.email,
        user_name: contactForm.name.trim() || "Not provided",
        ...userInfo,
      };

      console.log("Sending email with params:", templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      // Success handling
      setContactStatus("success");
      setContactForm({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setContactStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      setContactStatus("error");

      // Enhanced fallback
      const fallbackSubject = `Contact Form: ${
        contactForm.name || "User"
      } - QuickQuid`;
      const fallbackBody = `
User Information:
────────────────
Name: ${contactForm.name || "Not provided"}
Email: ${contactForm.email}
Date: ${new Date().toLocaleString()}
Page: ${window.location.href}

Message:
────────────────
${contactForm.message}

────────────────
This message was submitted via QuickQuid contact form but failed to send automatically.
Please reply directly to: ${contactForm.email}
      `.trim();

      const mailtoLink = `mailto:${
        EMAILJS_CONFIG.ADMIN_EMAIL
      }?subject=${encodeURIComponent(
        fallbackSubject
      )}&body=${encodeURIComponent(fallbackBody)}&cc=${encodeURIComponent(
        contactForm.email
      )}`;

      // Try to open mailto link
      window.location.href = mailtoLink;

      // Reset error message after 8 seconds
      setTimeout(() => {
        setContactStatus("idle");
      }, 8000);
    } finally {
      setIsContactSending(false);
    }
  };

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
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
              {/* Contact Info Column */}
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
                          onClick={onInstagramClick}
                          className="text-lg font-semibold text-white hover:text-pink-400 text-left"
                        >
                          @quickquid.in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form Column */}
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

                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Name (Optional)
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400" />
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Email *
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400" />
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactFormChange}
                          placeholder="student@college.edu"
                          className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        placeholder="Tell us what you're looking for, any questions, or feedback..."
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                        required
                      />
                    </div>

                    {/* Status Messages */}
                    {contactStatus === "success" && (
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl animate-pulse">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          <div>
                            <p className="text-green-300 font-medium">
                              Message sent successfully! 🎉
                            </p>
                            <p className="text-green-400/80 text-sm mt-1">
                              We've received your message at
                              contact@quickquid.in
                            </p>
                            <p className="text-green-400/60 text-xs mt-2">
                              You'll receive a copy at: {contactForm.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {contactStatus === "error" && (
                      <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 text-red-400">⚠️</div>
                          <div>
                            <p className="text-red-300 font-medium">
                              Sending failed - Using fallback method
                            </p>
                            <p className="text-red-400/80 text-sm mt-1">
                              Your email client is opening. Please send manually
                              to:
                            </p>
                            <code className="block mt-2 p-2 bg-black/30 rounded text-xs text-red-200">
                              contact@quickquid.in
                            </code>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isContactSending}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isContactSending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending to contact@quickquid.in...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-500">
                        Your message goes directly to our team
                      </p>
                      <p className="text-xs text-blue-400/80">
                        📧 contact@quickquid.in
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section
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
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold text-blue-300">
                  🎉 BE AMONG THE FIRST
                </span>
                <p className="text-lg font-bold text-white">
                  Join our exclusive beta waitlist
                </p>
              </div>
            </div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Ready to <span className="text-blue-400">Start Earning</span>?
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Join{" "}
              <span className="text-white font-semibold">
                {waitlistCount}+ students
              </span>{" "}
              who are building their futures with QuickQuid
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="max-w-md mx-auto mb-8"
            >
              <form onSubmit={handleWaitlistSubmit}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400" />
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="name@college.edu"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      required
                      disabled={
                        isWaitlistSending || waitlistStatus === "success"
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isWaitlistSending || waitlistStatus === "success"}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                  >
                    {isWaitlistSending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : waitlistStatus === "success" ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Joined! 🎉
                      </span>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
              </form>

              {/* Waitlist Status Messages */}
              {waitlistStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div className="text-left">
                      <p className="text-green-300 font-medium">
                        Welcome to the waitlist! 🚀
                      </p>
                      <p className="text-green-400/80 text-sm">
                        You're now #{waitlistCount} on the list. We've sent a
                        confirmation to our team.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {waitlistStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-red-400">⚠️</div>
                    <div className="text-left">
                      <p className="text-red-300 font-medium">
                        Failed to join waitlist
                      </p>
                      <p className="text-red-400/80 text-sm">
                        Your email client is opening. Please send your email to
                        contact@quickquid.in
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Waitlist Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {[
                {
                  icon: CheckCircle,
                  text: "No setup fees",
                  description: "Zero commission during beta",
                },
                {
                  icon: ShieldCheck,
                  text: "Verified community",
                  description: "Campus-verified users only",
                },
                {
                  icon: Rocket,
                  text: "Early access",
                  description: "Be first to use new features",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.text}
                    </h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-16 pt-8 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Waitlist Members",
                    value: waitlistCount,
                    suffix: "+",
                  },
                  { label: "Campuses", value: 24, suffix: "+" },
                  { label: "Cities", value: 12, suffix: "+" },
                  { label: "Beta Launch", value: "Q1 2025" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                      {stat.suffix || ""}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-12 text-sm text-gray-500 max-w-xl mx-auto"
            >
              By joining the waitlist, you agree to receive updates about
              QuickQuid's launch. We respect your privacy and won't spam you.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
