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
  FileText,
  Shield,
  RefreshCw,
  HelpCircle,
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

// Policy Pages Component
interface PolicyPageProps {
  title: string;
  content: React.ReactNode;
  lastUpdated?: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({
  title,
  content,
  lastUpdated,
}) => (
  <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              {title === "Privacy Policy" && (
                <Shield className="w-6 h-6 text-white" />
              )}
              {title === "Terms & Conditions" && (
                <FileText className="w-6 h-6 text-white" />
              )}
              {title === "Refund Policy" && (
                <RefreshCw className="w-6 h-6 text-white" />
              )}
              {title === "Service" && (
                <HelpCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              {lastUpdated && (
                <p className="text-sm text-gray-400">
                  Last Updated: {lastUpdated}
                </p>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">{content}</div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400">
              For questions about this {title.toLowerCase()}, contact us at{" "}
              <a
                href="mailto:contact@quickquid.in"
                className="text-blue-400 hover:text-blue-300"
              >
                contact@quickquid.in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
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
  const [currentPage, setCurrentPage] = useState("home");
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
    if (currentPage === "home") {
      if (heroInView) setActiveSection("hero");
      else if (storyInView) setActiveSection("story");
      else if (howItWorksInView) setActiveSection("how-it-works");
      else if (featuresInView) setActiveSection("features");
      else if (contactInView) setActiveSection("contact");
      else if (waitlistInView) setActiveSection("waitlist");
    }
  }, [
    heroInView,
    storyInView,
    howItWorksInView,
    featuresInView,
    contactInView,
    waitlistInView,
    currentPage,
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

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Policy content
  const privacyPolicyContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
        <p className="text-gray-300 mb-4">
          QuickQuid operates a task-based marketplace platform designed for
          students, by students. We are committed to protecting your personal
          data and respecting your privacy in accordance with:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Information Technology Act, 2000</li>
          <li>
            Information Technology (Reasonable Security Practices and Procedures
            and Sensitive Personal Data or Information) Rules, 2011
          </li>
          <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
        </ul>
        <p className="text-gray-300 mt-4">
          This Privacy Policy explains how QuickQuid collects, uses, stores,
          shares, and protects personal data when you access or use our website,
          mobile application, or related services (collectively, the
          "Platform").
        </p>
        <p className="text-gray-300 mt-2">
          By using QuickQuid, you consent to the practices described in this
          Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          2. Personal Data We Collect
        </h2>
        <h3 className="text-xl font-semibold text-white mb-2">
          a. Information Provided by You
        </h3>
        <p className="text-gray-300 mb-3">We may collect:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Mobile number</li>
          <li>College / institution details</li>
          <li>Profile details (skills, services offered, interests)</li>
          <li>Account credentials</li>
          <li>
            Payment-related information (processed through compliant third-party
            payment gateways)
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-2">
          b. Automatically Collected Information
        </h3>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>IP address</li>
          <li>Device and browser information</li>
          <li>Usage data and interaction logs</li>
          <li>Cookies and similar technologies</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          3. Purpose of Data Processing
        </h2>
        <p className="text-gray-300 mb-4">
          In compliance with the purpose limitation principle under the DPDP
          Act, QuickQuid processes personal data only for lawful and specific
          purposes, including:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Account creation and identity verification</li>
          <li>Enabling task posting, discovery, and completion</li>
          <li>Payment facilitation and transaction records</li>
          <li>Customer support and communication</li>
          <li>Platform security, fraud prevention, and abuse detection</li>
          <li>Legal compliance and regulatory obligations</li>
          <li>Improving platform functionality and user experience</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
        <p className="text-gray-300 mb-4">
          QuickQuid implements reasonable security practices and procedures,
          including technical, administrative, and organizational safeguards, to
          protect personal data from unauthorized access, loss, misuse, or
          disclosure in accordance with the IT Act, 2000 (Section 43A).
        </p>
        <p className="text-gray-300">
          While we strive to protect your data, no system can guarantee absolute
          security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
        <p className="text-gray-300 mb-4">
          Under the DPDP Act, you have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Access information about your personal data</li>
          <li>Request correction or updating of inaccurate data</li>
          <li>
            Request erasure of personal data, subject to legal obligations
          </li>
          <li>Withdraw consent for data processing</li>
          <li>File a grievance regarding data handling</li>
        </ul>
        <p className="text-gray-300 mt-4">
          Requests can be made using the contact details below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          6. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-300">
          QuickQuid may update this Privacy Policy periodically to reflect
          changes in law, technology, or business practices. Updates will be
          posted on this page with a revised "Last Updated" date.
        </p>
      </section>
    </div>
  );

  const termsContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-300">
          By accessing or using QuickQuid ("Platform"), you agree to be bound by
          these Terms and Conditions ("Terms"), along with our Privacy Policy
          and Refund & Cancellation Policy. If you do not agree, you must not
          use the Platform.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          2. About QuickQuid
        </h2>
        <p className="text-gray-300">
          QuickQuid is a technology intermediary that operates a task-based
          marketplace connecting users ("Service Requesters") with other users
          ("Service Providers"). QuickQuid does not provide services directly
          and does not guarantee the quality, safety, or legality of services
          offered by users.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>You must be at least 18 years of age to use the Platform.</li>
          <li>
            By using QuickQuid, you represent that you are legally capable of
            entering into a binding contract under Indian law.
          </li>
          <li>
            Accounts registered with false or misleading information may be
            suspended or terminated.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          4. User Responsibilities
        </h2>
        <p className="text-gray-300 mb-3">You agree that you will not:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Post false, misleading, illegal, or offensive content</li>
          <li>Engage in fraud, abuse, harassment, or exploitation</li>
          <li>Circumvent platform fees or payment systems</li>
          <li>Attempt to harm, disrupt, or reverse-engineer the Platform</li>
        </ul>
        <p className="text-gray-300 mt-4">
          Violation of these obligations may result in suspension or termination
          of your account.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          5. Services and Transactions
        </h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>All services listed or performed are solely between users.</li>
          <li>
            QuickQuid does not supervise, control, or verify the execution of
            services.
          </li>
          <li>
            Any agreement formed is strictly between the Service Requester and
            Service Provider.
          </li>
          <li>
            QuickQuid shall not be responsible for disputes arising from service
            quality, delivery, or outcomes.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Payments</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            Payments may be processed through third-party payment gateways.
          </li>
          <li>
            QuickQuid may charge a platform or convenience fee, which will be
            disclosed prior to payment.
          </li>
          <li>
            All transactions are subject to the Refund and Cancellation Policy.
          </li>
          <li>QuickQuid does not store sensitive payment details.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-300">
          To the maximum extent permitted by law, QuickQuid shall not be liable
          for indirect, incidental, or consequential damages. QuickQuid's total
          liability shall not exceed the amount paid by you on the Platform in
          the preceding six months.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          8. Governing Law and Jurisdiction
        </h2>
        <p className="text-gray-300">
          These Terms shall be governed by and construed in accordance with the
          laws of India. Courts located in India shall have exclusive
          jurisdiction.
        </p>
      </section>
    </div>
  );

  const refundPolicyContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
        <p className="text-gray-300">
          This Refund and Cancellation Policy governs the use of services
          offered on QuickQuid, a task-based marketplace connecting users for
          service requests and fulfillment. By using the QuickQuid platform
          ("Platform"), you agree to the terms outlined in this Policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          2. Nature of Services
        </h2>
        <p className="text-gray-300">
          QuickQuid acts solely as a technology intermediary that facilitates
          connections between users. QuickQuid does not directly provide
          services, and therefore refunds and cancellations are subject to the
          conditions outlined below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          3. Cancellation Policy
        </h2>

        <h3 className="text-xl font-semibold text-white mb-2">
          a. Cancellation by the Service Requester
        </h3>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
          <li>
            A service request may be cancelled before the service provider
            accepts the task, without any charge.
          </li>
          <li>
            Once a task has been accepted, cancellation may be subject to
            applicable platform or service-related fees.
          </li>
          <li>
            If the service has already been initiated or completed, cancellation
            may not be permitted.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-2">
          b. Cancellation by the Service Provider
        </h3>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            If a service provider cancels after accepting a task, QuickQuid may
            take appropriate action, including warnings, penalties, or account
            suspension, as per internal policies.
          </li>
          <li>
            Any prepaid amount for such cancelled services may be eligible for
            refund as per Section 4.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Refund Policy</h2>
        <p className="text-gray-300 mb-3">
          Refunds may be issued under the following circumstances:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
          <li>The service provider fails to deliver the agreed service.</li>
          <li>
            The service is materially different from what was described at the
            time of booking.
          </li>
          <li>
            The service is cancelled due to platform-related technical issues.
          </li>
          <li>
            A cancellation occurs before service initiation, where payment has
            already been made.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-2">
          Non-Refundable Situations
        </h3>
        <p className="text-gray-300 mb-3">Refunds will not be issued if:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>The service has been successfully completed as agreed.</li>
          <li>
            Dissatisfaction is based on personal preference without breach of
            agreed terms.
          </li>
          <li>
            Delay or failure is caused by factors beyond QuickQuid's control.
          </li>
          <li>
            Incorrect information is provided by the user at the time of
            booking.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          5. Refund Processing
        </h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            Approved refunds will be processed to the original payment method.
          </li>
          <li>
            Refund processing timelines typically range from 5 to 10 working
            days, depending on the payment provider.
          </li>
          <li>
            Any applicable platform or transaction fees may be deducted, where
            legally permissible.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          6. Dispute Resolution
        </h2>
        <p className="text-gray-300 mb-3">
          If a dispute arises regarding a service:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            Users must raise a dispute within 48 hours of service completion or
            cancellation.
          </li>
          <li>
            QuickQuid may review communication logs, transaction records, and
            platform data to determine eligibility for refund.
          </li>
          <li>
            The decision made by QuickQuid after review shall be final and
            binding, subject to applicable law.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          7. No Cash Refunds
        </h2>
        <p className="text-gray-300">
          QuickQuid does not offer cash refunds. All refunds will be processed
          digitally through the original payment channel.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">8. Policy Abuse</h2>
        <p className="text-gray-300 mb-3">QuickQuid reserves the right to:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            Deny refunds in cases of suspected misuse, fraud, or repeated
            cancellations.
          </li>
          <li>
            Suspend or terminate accounts found abusing the refund or
            cancellation process.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          9. Changes to This Policy
        </h2>
        <p className="text-gray-300">
          QuickQuid reserves the right to modify this Refund and Cancellation
          Policy at any time. Changes will be effective immediately upon posting
          on the Platform with an updated "Last Updated" date.
        </p>
      </section>
    </div>
  );

  const serviceContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-gray-300 mb-4">
          QuickQuid is a student-centric platform designed to empower college
          students to monetize their skills and connect with opportunities
          within their campus ecosystem. Our services include:
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          Core Platform Services
        </h2>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Skill Marketplace
            </h3>
            <p className="text-gray-300">
              Students can offer their expertise in various fields such as
              graphic design, programming, content writing, video editing, and
              more. Set your own rates and connect with peers who need your
              skills.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Academic Assistance
            </h3>
            <p className="text-gray-300">
              Connect with subject matter experts for tutoring, assignment help,
              project guidance, and exam preparation. Share knowledge within
              your academic community.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Campus Commerce
            </h3>
            <p className="text-gray-300">
              Buy and sell textbooks, notes, electronics, and other items within
              your campus community. A safe and convenient way to trade with
              verified students.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Part-Time Opportunities
            </h3>
            <p className="text-gray-300">
              Access verified part-time jobs, internships, and gig opportunities
              from local businesses and alumni looking to hire students.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Project Collaboration
            </h3>
            <p className="text-gray-300">
              Find teammates for academic projects, startups, or creative
              ventures. Connect with students who have complementary skills.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          Platform Features
        </h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>
            <span className="font-semibold">Zero Commission (Beta Phase):</span>{" "}
            Keep 100% of your earnings during our beta launch period
          </li>
          <li>
            <span className="font-semibold">Verified Community:</span> All users
            are verified with college credentials for safety
          </li>
          <li>
            <span className="font-semibold">Secure Payments:</span> Protected
            transactions through trusted payment gateways
          </li>
          <li>
            <span className="font-semibold">Rating System:</span> Build your
            reputation with verified reviews and ratings
          </li>
          <li>
            <span className="font-semibold">Campus-Focused:</span> Designed
            specifically for college ecosystems and local opportunities
          </li>
          <li>
            <span className="font-semibold">24/7 Support:</span> Dedicated
            support team for any platform-related queries
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">1</div>
            <h4 className="font-semibold text-white mb-1">Sign Up</h4>
            <p className="text-sm text-gray-400">Verify with college email</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">2</div>
            <h4 className="font-semibold text-white mb-1">Create Profile</h4>
            <p className="text-sm text-gray-400">Showcase your skills</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">3</div>
            <h4 className="font-semibold text-white mb-1">Find Work</h4>
            <p className="text-sm text-gray-400">
              Browse or create opportunities
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-2">4</div>
            <h4 className="font-semibold text-white mb-1">Get Paid</h4>
            <p className="text-sm text-gray-400">Secure, fast payments</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          Service Limitations
        </h2>
        <p className="text-gray-300 mb-3">
          QuickQuid operates as a technology intermediary platform. We:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Do not directly provide the services listed on the platform</li>
          <li>
            Do not guarantee the quality, safety, or legality of services
            offered by users
          </li>
          <li>Do not supervise or control the execution of services</li>
          <li>Are not party to any agreement between users</li>
        </ul>
        <p className="text-gray-300 mt-4">
          All services are provided by independent users, and QuickQuid's role
          is limited to facilitating connections and transactions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
        <p className="text-gray-300">
          Ready to join the QuickQuid community? Visit our homepage to join the
          waitlist and be among the first to experience our platform. During
          beta, enjoy zero commission fees and priority access to new features.
        </p>
      </section>
    </div>
  );

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "privacy":
        return (
          <PolicyPage
            title="Privacy Policy"
            content={privacyPolicyContent}
            lastUpdated="December 27, 2025"
          />
        );
      case "terms":
        return (
          <PolicyPage
            title="Terms & Conditions"
            content={termsContent}
            lastUpdated="December 27, 2025"
          />
        );
      case "refund":
        return (
          <PolicyPage
            title="Refund Policy"
            content={refundPolicyContent}
            lastUpdated="December 27, 2025"
          />
        );
      case "service":
        return (
          <PolicyPage
            title="Service"
            content={serviceContent}
            lastUpdated="December 27, 2025"
          />
        );
      case "home":
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <>
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
                {
                  value: "No Platform Fees",
                  label: "Beta phase only",
                  icon: Percent,
                },
                {
                  value: "Secure Payments",
                  label: "Powered by trusted gateways",
                  icon: ShieldCheck,
                },
                {
                  value: "Verified Users",
                  label: "Campus-checked profiles",
                  icon: UserCheck,
                },
                {
                  value: "Transparent Pricing",
                  label: "No hidden charges",
                  icon: Award,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
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
                    { value: "Beta Phase", label: "No Fees" },
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
                  title: "No Platform Fees",
                  desc: "Enjoy zero commission during our beta phase. Keep all your earnings.",
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
    </>
  );

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
              onClick={navigateToHome}
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
              {currentPage === "home" ? (
                <>
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
                </>
              ) : (
                <div className="flex items-center space-x-6">
                  <button
                    onClick={navigateToHome}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    ← Back to Home
                  </button>
                  <div className="text-sm font-medium text-blue-400">
                    {currentPage === "privacy" && "Privacy Policy"}
                    {currentPage === "terms" && "Terms & Conditions"}
                    {currentPage === "refund" && "Refund Policy"}
                    {currentPage === "service" && "Our Services"}
                  </div>
                </div>
              )}
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
                {currentPage === "home" ? (
                  <>
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

                    <div className="pt-4 border-t border-white/10">
                      <p className="px-4 py-2 text-sm font-medium text-gray-400">
                        Legal & Support
                      </p>
                      <button
                        onClick={() => navigateToPage("privacy")}
                        className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      >
                        Privacy Policy
                      </button>
                      <button
                        onClick={() => navigateToPage("terms")}
                        className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      >
                        Terms & Conditions
                      </button>
                      <button
                        onClick={() => navigateToPage("refund")}
                        className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      >
                        Refund Policy
                      </button>
                      <button
                        onClick={() => navigateToPage("service")}
                        className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                      >
                        Our Services
                      </button>
                    </div>

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
                  </>
                ) : (
                  <>
                    <button
                      onClick={navigateToHome}
                      className="flex items-center gap-2 text-gray-300 hover:text-white w-full py-3 px-4 hover:bg-white/5 rounded-lg transition-all duration-300"
                    >
                      ← Back to Home
                    </button>
                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={() => navigateToPage("privacy")}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                          currentPage === "privacy"
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        Privacy Policy
                      </button>
                      <button
                        onClick={() => navigateToPage("terms")}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                          currentPage === "terms"
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        Terms & Conditions
                      </button>
                      <button
                        onClick={() => navigateToPage("refund")}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                          currentPage === "refund"
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        Refund Policy
                      </button>
                      <button
                        onClick={() => navigateToPage("service")}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                          currentPage === "service"
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        Our Services
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Render Current Page */}
      {renderPage()}

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
              <button
                onClick={() => navigateToPage("privacy")}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy
              </button>
              <button
                onClick={() => navigateToPage("terms")}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms
              </button>
              <a
                href="mailto:contact@quickquid.in"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
              <button
                onClick={() => navigateToPage("service")}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Services
              </button>
              <button
                onClick={() => navigateToPage("refund")}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Refund Policy
              </button>

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
      {currentPage === "home" && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40"
        >
          <ArrowRight className="w-5 h-5 transform -rotate-90" />
        </motion.button>
      )}

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
          
          /* Prose styling for policy pages */
          .prose {
            color: #d1d5db;
          }
          
          .prose h2 {
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          
          .prose h3 {
            color: #e5e7eb;
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .prose p {
            margin-bottom: 1rem;
            line-height: 1.7;
          }
          
          .prose ul {
            margin-bottom: 1rem;
          }
          
          .prose li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
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
