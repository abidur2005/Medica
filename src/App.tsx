import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Droplets, 
  Users, 
  Calendar, 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Heart, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  User as UserIcon,
  LogOut,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Building2,
  Camera,
  Upload,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { cn } from './lib/utils';
import { PHARMACIES, CITIES, BLOOD_DONORS, HEALTH_SESSIONS, MOCK_ORDERS, MEDICINE_PRICES } from './data/mockData';
import { Pharmacy, User, CartItem, MedicineOrder } from './types';

// --- Components ---

const Navbar = ({ 
  user, 
  onLoginClick, 
  onLogout, 
  cartCount, 
  onCartClick 
}: { 
  user: User | null; 
  onLoginClick: () => void; 
  onLogout: () => void; 
  cartCount: number;
  onCartClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pharmacies', path: '/pharmacies' },
    { name: 'Blood Bank', path: '/blood-bank' },
    { name: 'Health Sessions', path: '/sessions' },
    { name: 'Health Tips', path: '/health-tips' },
  ];

  if (user) {
    navLinks.push({ name: 'Profile', path: '/profile' });
  }

  if (user && (user.role === 'pharmacy' || user.role === 'delivery')) {
    navLinks.push({ name: 'Management', path: '/management' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Medica
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  location.pathname === link.path ? "text-emerald-600" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
              <a 
                href="tel:01619253690"
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                title="Call Support"
              >
                <Phone size={22} />
              </a>

              <button 
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">{user.name}</p>
                    <button onClick={onLogout} className="text-[10px] text-red-500 font-bold uppercase tracking-wider hover:underline">Logout</button>
                  </div>
                  <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                    {user.name[0]}
                  </div>
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 flex items-center gap-2"
                >
                  <UserIcon size={16} /> Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <a 
              href="tel:01619253690"
              className="p-2 text-gray-600"
            >
              <Phone size={22} />
            </a>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-lg font-medium",
                    location.pathname === link.path ? "text-emerald-600" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-50">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => { onLogout(); setIsOpen(false); }} className="p-2 text-red-500"><LogOut size={20} /></button>
                  </div>
                ) : (
                  <button
                    onClick={() => { onLoginClick(); setIsOpen(false); }}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <UserIcon size={18} /> Login / Sign Up
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-950 text-gray-400 py-12 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <Activity size={18} />
          </div>
          <span className="text-xl font-bold text-white">Medica</span>
        </div>
        <p className="max-w-sm text-sm leading-relaxed">
          Your health, our priority. Connecting communities with essential healthcare services. From medicine delivery to blood donation, we're here to bridge the gap in healthcare accessibility.
        </p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-sm">
          <li><Link to="/pharmacies" className="hover:text-emerald-500 transition-colors">Find Pharmacies</Link></li>
          <li><Link to="/blood-bank" className="hover:text-emerald-500 transition-colors">Blood Bank</Link></li>
          <li><Link to="/sessions" className="hover:text-emerald-500 transition-colors">Health Sessions</Link></li>
          <li><Link to="/health-tips" className="hover:text-emerald-500 transition-colors">Health Tips</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-6">Contact</h4>
        <ul className="space-y-4 text-sm">
          <li className="flex items-center gap-2"><Phone size={14} /> +880 1619 253690</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> Dhaka, Bangladesh</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs">
      &copy; {new Date().getFullYear()} Medica. All rights reserved.
    </div>
  </footer>
);

// --- Pages ---

const HomePage = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=1200", // Lab
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200", // Stethoscope
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200", // Doctor
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1200"  // Pharmacy
  ];

  const reviews = [
    {
      name: "রাহাত আহমেদ",
      role: "রোগী",
      review: "লকডাউনের সময় মেডিকা আমার নিয়মিত ওষুধ খুঁজে পাওয়া খুব সহজ করে দিয়েছিল। ডেলিভারি ছিল দ্রুত এবং ফার্মেসিগুলো যাচাইকৃত ছিল।",
      rating: 5
    },
    {
      name: "সুমাইয়া কবির",
      role: "রক্তদাতা",
      review: "ব্লাড ব্যাংক ফিচারের মাধ্যমে আমি জরুরি অবস্থায় তিনজনকে সাহায্য করতে পেরেছি। আমাদের সম্প্রদায়ের জন্য এটি একটি জীবন রক্ষাকারী প্ল্যাটফর্ম।",
      rating: 5
    },
    {
      name: "ডাঃ ফয়সাল করিম",
      role: "স্বাস্থ্য বিশেষজ্ঞ",
      review: "সঠিক চিকিৎসা তথ্য মানুষের কাছে পৌঁছে দেওয়ার জন্য হেলথ সেশনগুলো একটি দারুণ উপায়। স্বাস্থ্য সচেতনতার জন্য আমি মেডিকাকে সুপারিশ করছি।",
      rating: 5
    },
    {
      name: "আনিকা তাহসিন",
      role: "নিয়মিত ব্যবহারকারী",
      review: "ইন্টারফেসটি খুব পরিষ্কার এবং ব্যবহার করা সহজ। আমি কোনো ঝামেলা ছাড়াই অন্য শহর থেকে আমার বাবা-মায়ের জন্য ওষুধ অর্ডার করতে পারি।",
      rating: 5
    },
    {
      name: "তানভীর হাসান",
      role: "ডেলিভারি পার্টনার",
      review: "অ্যাপটি পরিষ্কার নির্দেশনা প্রদান করে এবং আমাকে দক্ষতার সাথে আমার ডেলিভারি পরিচালনা করতে সাহায্য করে। ব্যবহারকারী এবং পার্টনার উভয়ের জন্যই চমৎকার প্ল্যাটফর্ম।",
      rating: 5
    }
  ];

  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => {
      clearInterval(reviewTimer);
      clearInterval(heroTimer);
    };
  }, [reviews.length, heroImages.length]);

  return (
    <div className="space-y-20 md:space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-20 pb-24 md:pb-32 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=2070" 
            alt="Medica Delivery Service" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-emerald-950/70 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md text-emerald-50 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest mb-8 border border-emerald-400/30">
              <Activity size={16} className="animate-pulse" />
              Your health, our priority
            </div>
            
            {/* Hero Image Slider */}
            <div className="relative w-full max-w-2xl h-64 md:h-80 mb-12 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentHeroImage}
                  src={heroImages[currentHeroImage]}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/pharmacies"
                className="bg-emerald-600 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/40 flex items-center gap-3 group"
              >
                Order Medicine <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/blood-bank"
                className="bg-emerald-600 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/40 flex items-center gap-3 group"
              >
                Find Blood <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Services</h2>
          <p className="text-gray-500">Comprehensive healthcare solutions at your fingertips.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {[
            {
              icon: <ShoppingBag size={32} />,
              title: "Medicine Delivery",
              desc: "Order from verified local pharmacies and get it delivered to your doorstep.",
              color: "bg-emerald-50 text-emerald-600",
              link: "/pharmacies"
            },
            {
              icon: <Droplets size={32} />,
              title: "Blood Bank",
              desc: "Connect with voluntary blood donors in your city during emergencies.",
              color: "bg-emerald-50 text-emerald-600",
              link: "/blood-bank"
            },
            {
              icon: <Calendar size={32} />,
              title: "Health Sessions",
              desc: "Participate in free health awareness sessions led by medical experts.",
              color: "bg-blue-50 text-blue-600",
              link: "/sessions"
            },
            {
              icon: <Heart size={32} />,
              title: "Health Tips",
              desc: "Get expert advice and daily tips to maintain a healthy lifestyle.",
              color: "bg-orange-50 text-orange-600",
              link: "/health-tips"
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all flex flex-col h-full"
            >
              <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8", service.color)}>
                {React.cloneElement(service.icon as React.ReactElement, { size: 24, className: "md:w-8 md:h-8" })}
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">{service.title}</h3>
              <p className="text-xs md:text-gray-500 leading-relaxed mb-6 md:mb-8 line-clamp-2 md:line-clamp-none flex-grow">{service.desc}</p>
              <div className="mt-auto">
                <Link to={service.link} className="text-emerald-600 md:text-gray-900 font-bold flex items-center gap-1 md:gap-2 group text-sm md:text-base">
                  Learn More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-emerald-600 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">গ্রাহকদের মতামত</h2>
            <p className="text-emerald-100">মেডিকা সম্পর্কে আমাদের ব্যবহারকারীরা যা বলছেন।</p>
          </div>
          
          <div className="max-w-3xl mx-auto relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[32px] border border-white/20 text-white text-center h-full flex flex-col justify-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl mb-8 italic leading-relaxed">
                  "{reviews[currentReview].review}"
                </p>
                <div>
                  <div className="font-bold text-lg">{reviews[currentReview].name}</div>
                  <div className="text-emerald-200">{reviews[currentReview].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentReview === i ? "bg-white w-6" : "bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by City Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Browse by City</h2>
            <p className="text-gray-500">Find pharmacies and donors in your specific city.</p>
          </div>
          <Link to="/pharmacies" className="hidden md:flex items-center gap-2 text-emerald-600 font-bold hover:underline">
            View All Cities <ChevronRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CITIES.map((city, i) => (
            <Link 
              key={city}
              to={`/pharmacies?city=${city}`}
              className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{city}</h3>
              <p className="text-sm text-gray-400 mt-2">View Pharmacies</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const PharmacyPage = ({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParam = searchParams.get('city');
  
  const [selectedCity, setSelectedCity] = useState(cityParam || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [medicineName, setMedicineName] = useState("");
  const [prescription, setPrescription] = useState<string | null>(null);

  useEffect(() => {
    if (cityParam) {
      setSelectedCity(cityParam);
    }
  }, [cityParam]);

  const filteredPharmacies = PHARMACIES.filter(p => 
    (selectedCity === "All" || p.city === selectedCity) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city === "All") {
      searchParams.delete('city');
    } else {
      searchParams.set('city', city);
    }
    setSearchParams(searchParams);
  };

  const handleOrder = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setIsOrderModalOpen(true);
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPharmacy) return;
    
    // Try to find price from MEDICINE_PRICES
    let price = 10; // Default price
    const normalizedInput = medicineName.toLowerCase().trim();
    
    // Check for exact or partial matches
    const matchedKey = Object.keys(MEDICINE_PRICES).find(key => 
      normalizedInput.includes(key.toLowerCase())
    );
    
    if (matchedKey) {
      price = MEDICINE_PRICES[matchedKey];
    }
    
    onAddToCart({
      pharmacyId: selectedPharmacy.id,
      pharmacyName: selectedPharmacy.name,
      medicineName: medicineName,
      quantity: 1,
      price: price,
      prescriptionImage: prescription || undefined
    });
    
    setMedicineName("");
    setPrescription(null);
    setIsOrderModalOpen(false);
    toast.success(`Added to cart! Price: ৳${price}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescription(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Local Pharmacies</h1>
          <p className="text-gray-500">Find and order from pharmacies in your city.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search pharmacy..."
              className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="px-6 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="All">All Cities</option>
            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPharmacies.map((pharmacy) => (
          <motion.div
            layout
            key={pharmacy.id}
            className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={pharmacy.image} 
                alt={pharmacy.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-gray-900">
                <Heart size={14} className="text-red-500 fill-red-500" /> {pharmacy.rating}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin size={14} /> {pharmacy.city}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pharmacy.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{pharmacy.address}</p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone size={14} /> {pharmacy.contact}
                </div>
                <button 
                  onClick={() => handleOrder(pharmacy)}
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  Add Medicine
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredPharmacies.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="text-gray-300 mb-4"><ShoppingBag size={64} className="mx-auto" /></div>
            <p className="text-gray-500 font-medium">No pharmacies found in {selectedCity}.</p>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Add to Cart</h2>
                <button onClick={() => setIsOrderModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-8">Ordering from <span className="font-bold text-emerald-600">{selectedPharmacy?.name}</span></p>
              
              <form onSubmit={handleAddToCart} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Medicine Name</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Napa Extend, Sergel 20mg"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 ml-1">Prescription (Optional)</label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-8 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileChange}
                    />
                    {prescription ? (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                        <img src={prescription} alt="Prescription" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPrescription(null); }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <Camera size={32} />
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">Upload or Take Photo</p>
                        <p className="text-xs text-gray-500">Upload your prescription image</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                    Add to Cart
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BloodBankPage = () => {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const filteredDonors = BLOOD_DONORS.filter(d => 
    (selectedGroup === "All" || d.bloodGroup === selectedGroup) &&
    (selectedCity === "All" || d.city === selectedCity)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Droplets size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Bank</h1>
        <p className="text-gray-500">Find voluntary blood donors in your city. Every drop counts in saving a life.</p>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm mb-12 flex flex-wrap gap-6 items-center justify-center">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blood Group:</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedGroup("All")}
              className={cn("px-4 py-2 rounded-xl text-sm font-bold transition-all", selectedGroup === "All" ? "bg-red-600 text-white shadow-lg shadow-red-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}
            >
              All
            </button>
            {bloodGroups.map(group => (
              <button 
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={cn("px-4 py-2 rounded-xl text-sm font-bold transition-all", selectedGroup === group ? "bg-red-600 text-white shadow-lg shadow-red-100" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
        <div className="h-8 w-px bg-gray-100 hidden md:block" />
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">City:</span>
          <select 
            className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-bold"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="All">All Cities</option>
            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDonors.map((donor) => (
          <motion.div
            layout
            key={donor.id}
            className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex items-start gap-6"
          >
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-black">{donor.bloodGroup}</span>
            </div>
            <div className="space-y-4 w-full">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{donor.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <MapPin size={14} /> {donor.city}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <Clock size={12} /> Last Donation: {donor.lastDonationDate}
              </div>
              <a 
                href={`tel:${donor.contact}`}
                className="flex items-center justify-center gap-2 w-full bg-gray-950 text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                <Phone size={16} /> Contact Donor
              </a>
            </div>
          </motion.div>
        ))}
        {filteredDonors.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="text-gray-300 mb-4"><Users size={64} className="mx-auto" /></div>
            <p className="text-gray-500 font-medium">No donors found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SessionsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Sessions</h1>
          <p className="text-gray-500">Join our free health awareness programs led by experts.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2">
          <CheckCircle2 size={18} /> All sessions are free to attend
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {HEALTH_SESSIONS.map((session) => (
          <motion.div
            key={session.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row"
          >
            <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img 
                src={session.image} 
                alt={session.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-3/5 p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                  <Calendar size={14} /> {session.date} • {session.time}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{session.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{session.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <Users size={16} className="text-gray-400" /> Speaker: {session.speaker}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <MapPin size={16} className="text-gray-400" /> {session.location}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => toast.success("Registration successful! We'll send you a reminder.")}
                className="mt-8 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                Register Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

// --- Main App ---

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (user: User) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<'customer' | 'delivery' | 'pharmacy'>('customer');
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verification for Pharmacy and Delivery
    if (role !== 'customer') {
      if (verificationCode !== "MEDICA-ADMIN") {
        toast.error("Invalid verification code for this role!");
        return;
      }
    }

    // Mock login
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (email.split('@')[0]) : name,
      email: email,
      role: role
    });
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{isLogin ? "Welcome Back" : "Create Account"}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                <input 
                  required 
                  type="password" 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">I am a:</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['customer', 'pharmacy', 'delivery'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(
                        "py-3 rounded-xl text-xs font-bold border-2 transition-all capitalize",
                        role === r 
                          ? "bg-emerald-50 border-emerald-600 text-emerald-600" 
                          : "bg-white border-gray-100 text-gray-500 hover:border-emerald-200"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {role !== 'customer' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="text-sm font-bold text-orange-600 ml-1 flex items-center gap-2">
                    Verification Code Required
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Enter admin code..."
                    className="w-full px-6 py-4 bg-orange-50 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500" 
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-400 ml-1 italic">Only authorized personnel can register as Pharmacy or Delivery.</p>
                </motion.div>
              )}
              
              <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                {isLogin ? "Login" : "Sign Up"}
              </button>
              
              <p className="text-center text-sm text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CartModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[]; 
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onCheckout: (address: string) => void;
}) => {
  const [address, setAddress] = useState("");
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = cart.length > 0 ? 50 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <button onClick={onClose} className="text-emerald-600 font-bold hover:underline">Start Shopping</button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">{item.pharmacyName}</p>
                      <h4 className="font-bold text-gray-900 mb-2">{item.medicineName}</h4>
                      {item.prescriptionImage && (
                        <div className="mb-3 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg border border-emerald-100">
                          <Camera size={12} /> Prescription Added
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1">
                          <button onClick={() => onUpdateQuantity(index, -1)} className="p-1 hover:text-emerald-600"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(index, 1)} className="p-1 hover:text-emerald-600"><Plus size={14} /></button>
                        </div>
                        <p className="font-bold text-gray-900">৳{item.price * item.quantity}</p>
                      </div>
                    </div>
                    <button onClick={() => onRemove(index)} className="text-gray-300 hover:text-red-500 transition-colors self-start">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>৳{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery Charge</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>৳{total + deliveryCharge}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Delivery Address</label>
                  <textarea 
                    required 
                    placeholder="Enter your full address..."
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm min-h-[100px] resize-none" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <button 
                  onClick={() => {
                    if (!address.trim()) {
                      toast.error("Please enter your delivery address");
                      return;
                    }
                    onCheckout(address);
                  }}
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3"
                >
                  <CreditCard size={20} /> Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HealthTipsPage = () => {
  const tips = [
    { 
      title: "পর্যাপ্ত পানি পান করুন", 
      desc: "আপনার শরীরকে সচল রাখতে এবং ত্বক উজ্জ্বল রাখতে প্রতিদিন অন্তত ৮-১০ গ্লাস পানি পান করুন।",
      icon: <Droplets size={24} />,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      title: "নিয়মিত ব্যায়াম করুন", 
      desc: "সপ্তাহের অধিকাংশ দিন অন্তত ৩০ মিনিট মাঝারি ধরনের শারীরিক পরিশ্রম যেমন দ্রুত হাঁটার লক্ষ্য রাখুন।",
      icon: <Activity size={24} />,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      title: "সুষম খাদ্য", 
      desc: "আপনার প্রতিদিনের খাবারে বিভিন্ন ধরনের রঙিন ফল, শাকসবজি, গোটা শস্য এবং চর্বিহীন প্রোটিন অন্তর্ভুক্ত করুন।",
      icon: <ShoppingBag size={24} />,
      color: "bg-orange-50 text-orange-600"
    },
    { 
      title: "পর্যাপ্ত ঘুম", 
      desc: "শারীরিক ও মানসিক পুনরুদ্ধারের জন্য অধিকাংশ প্রাপ্তবয়স্কদের প্রতি রাতে ৭-৯ ঘণ্টা মানসম্মত ঘুমের প্রয়োজন।",
      icon: <Clock size={24} />,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Heart size={32} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">Daily Health Tips</h1>
        <p className="text-xl text-gray-500">Small changes can lead to big results. Follow these expert tips for a healthier life.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {tips.map((tip, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", tip.color)}>
              {tip.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{tip.title}</h3>
            <p className="text-gray-500 leading-relaxed text-lg">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  user, 
  onUpdate 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  user: User; 
  onUpdate: (u: User) => void; 
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, name, email });
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900">Edit Profile</h2>
              <button onClick={onClose} className="w-10 h-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
              >
                Save Changes
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProfilePage = ({ user, onUpdateUser }: { user: User | null; onUpdateUser: (u: User) => void }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <UserIcon size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
        <p className="text-gray-500 max-w-md">
          You need to be logged in to view your profile.
        </p>
      </div>
    );
  }

  const stats = {
    totalOrders: MOCK_ORDERS.length,
    completedOrders: MOCK_ORDERS.filter(o => o.status === 'delivered').length,
    totalEarnings: MOCK_ORDERS.reduce((acc, o) => acc + o.commission, 0),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden"
      >
        <div className="bg-emerald-600 h-32 relative">
          <div className="absolute -bottom-12 left-12">
            <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-lg">
              <div className="w-full h-full bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-black">
                {user.name[0]}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-12 px-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-1">{user.name}</h1>
              <p className="text-gray-500 font-medium">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest rounded-full border border-emerald-100">
                {user.role}
              </span>
            </div>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all"
            >
              Edit Profile
            </button>
          </div>

          {(user.role === 'pharmacy' || user.role === 'delivery') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Orders</p>
                <p className="text-3xl font-black text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Delivered</p>
                <p className="text-3xl font-black text-emerald-600">{stats.completedOrders}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Earnings</p>
                <p className="text-3xl font-black text-emerald-600">৳{stats.totalEarnings}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Work Location</p>
                    <p className="font-bold text-gray-900">Dhaka, Bangladesh</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Payment Method</p>
                    <p className="font-bold text-gray-900">bKash (01619253690)</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {user && (
        <EditProfileModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onUpdate={onUpdateUser}
        />
      )}
    </div>
  );
};

const ManagementPage = ({ user }: { user: User | null }) => {
  const [orders, setOrders] = useState<MedicineOrder[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<'all' | 'pending'>('all');
  const [selectedOrder, setSelectedOrder] = useState<MedicineOrder | null>(null);

  if (!user || (user.role !== 'pharmacy' && user.role !== 'delivery')) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <X size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 text-center max-w-md">
          This page is only for registered Pharmacies and Delivery Personnel. Please login with the correct role.
        </p>
      </div>
    );
  }

  const updateStatus = (orderId: string, newStatus: MedicineOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order ${orderId} status updated to ${newStatus.replace('_', ' ')}`);
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Management Dashboard</h1>
          <p className="text-gray-500">Welcome back, <span className="font-bold text-emerald-600">{user.name}</span> ({user.role})</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setFilter('all')}
            className={cn(
              "px-6 py-3 rounded-2xl border transition-all text-left shadow-sm",
              filter === 'all' ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-gray-100 text-gray-900 hover:border-emerald-200"
            )}
          >
            <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", filter === 'all' ? "text-emerald-100" : "text-gray-400")}>Total Orders</p>
            <p className="text-2xl font-black">{orders.length}</p>
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={cn(
              "px-6 py-3 rounded-2xl border transition-all text-left shadow-sm",
              filter === 'pending' ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-100 text-gray-900 hover:border-orange-200"
            )}
          >
            <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", filter === 'pending' ? "text-orange-100" : "text-gray-400")}>Pending</p>
            <p className="text-2xl font-black">{orders.filter(o => o.status === 'pending').length}</p>
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No {filter} orders found.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedOrder(order)}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer group"
            >
            <div className="space-y-4 flex-grow">
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">{order.id}</span>
                <span className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider",
                  order.status === 'pending' ? "bg-orange-50 text-orange-600" :
                  order.status === 'picked_up' ? "bg-blue-50 text-blue-600" :
                  "bg-emerald-50 text-emerald-600"
                )}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{order.customerName}</h3>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <MapPin size={16} /> {order.customerAddress}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Medicines</p>
                <p className="text-gray-700 font-medium line-clamp-1">{order.medicineList}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 min-w-[200px]">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Amount</p>
                <p className="text-2xl font-black text-emerald-600">৳{order.totalAmount}</p>
                <p className="text-[10px] font-bold text-gray-400">Commission: ৳{order.commission}</p>
              </div>

              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                {user.role === 'pharmacy' && order.status === 'pending' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'picked_up')}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    Ready for Pickup
                  </button>
                )}
                {user.role === 'delivery' && order.status === 'pending' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'picked_up')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Accept & Pickup
                  </button>
                )}
                {user.role === 'delivery' && order.status === 'picked_up' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'delivered')}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )))}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Order Details</h2>
                  <p className="text-gray-500 font-bold">ID: {selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-12 h-12 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Info</p>
                      <h3 className="text-xl font-bold text-gray-900">{selectedOrder.customerName}</h3>
                      <p className="text-gray-500 flex items-center gap-2 mt-2">
                        <MapPin size={18} className="text-emerald-500" /> {selectedOrder.customerAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order Status</p>
                      <span className={cn(
                        "px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider inline-block",
                        selectedOrder.status === 'pending' ? "bg-orange-50 text-orange-600" :
                        selectedOrder.status === 'picked_up' ? "bg-blue-50 text-blue-600" :
                        "bg-emerald-50 text-emerald-600"
                      )}>
                        {selectedOrder.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Payment Summary</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Order Total</span>
                        <span className="text-xl font-black text-gray-900">৳{selectedOrder.totalAmount}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-emerald-200/50">
                        <span className="text-emerald-700 font-bold">Your Commission</span>
                        <span className="text-xl font-black text-emerald-700">৳{selectedOrder.commission}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Medication List</p>
                  <div className="space-y-3">
                    {selectedOrder.medicineList.split(',').map((med, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="font-medium">{med.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4" onClick={(e) => e.stopPropagation()}>
                  {user.role === 'pharmacy' && selectedOrder.status === 'pending' && (
                    <button 
                      onClick={() => {
                        updateStatus(selectedOrder.id, 'picked_up');
                        setSelectedOrder(null);
                      }}
                      className="flex-grow bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                    >
                      Mark Ready for Pickup
                    </button>
                  )}
                  {user.role === 'delivery' && selectedOrder.status === 'pending' && (
                    <button 
                      onClick={() => {
                        updateStatus(selectedOrder.id, 'picked_up');
                        setSelectedOrder(null);
                      }}
                      className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                    >
                      Accept & Pickup Order
                    </button>
                  )}
                  {user.role === 'delivery' && selectedOrder.status === 'picked_up' && (
                    <button 
                      onClick={() => {
                        updateStatus(selectedOrder.id, 'delivered');
                        setSelectedOrder(null);
                      }}
                      className="flex-grow bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                    >
                      Confirm Delivery
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.findIndex(i => 
        i.pharmacyId === item.pharmacyId && 
        i.medicineName === item.medicineName && 
        i.prescriptionImage === item.prescriptionImage
      );
      if (existing > -1) {
        const newCart = [...prev];
        newCart[existing].quantity += 1;
        return newCart;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
      return newCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = (address: string) => {
    if (!user) {
      setIsCartOpen(false);
      setIsLoginModalOpen(true);
      toast.error("Please login to complete your order");
      return;
    }
    toast.success(`Order placed successfully! Delivery to: ${address}. Total: ৳${cart.reduce((s, i) => s + (i.price * i.quantity), 0) + 50}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Toaster position="top-center" richColors />
        <Navbar 
          user={user} 
          onLoginClick={() => setIsLoginModalOpen(true)} 
          onLogout={() => { setUser(null); toast.info("Logged out"); }}
          cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pharmacies" element={<PharmacyPage onAddToCart={handleAddToCart} />} />
            <Route path="/blood-bank" element={<BloodBankPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/health-tips" element={<HealthTipsPage />} />
            <Route path="/profile" element={<ProfilePage user={user} onUpdateUser={(u) => setUser(u)} />} />
            <Route path="/management" element={<ManagementPage user={user} />} />
          </Routes>
        </main>
        <Footer />

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
          onLogin={(u) => setUser(u)} 
        />
        
        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      </div>
    </Router>
  );
}
