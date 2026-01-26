"use client";
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Code, Briefcase, Mail, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Award },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail }
  ];

  // Handle active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full relative">
      {/* Desktop Navbar - Tab-like Design */}
      <div className="hidden md:flex items-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.substring(1);
          
          return (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-medium group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={16} className={`${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
              <span className="text-sm">{item.name}</span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile Navbar Button */}
      <div className="md:hidden">
        <motion.button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative text-white hover:text-blue-400 transition-colors duration-300 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 right-0 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl p-3 min-w-[200px] z-50 shadow-2xl"
          >
            <div className="absolute -top-2 right-6 w-4 h-4 bg-black/95 border-l border-t border-white/20 transform rotate-45"></div>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-300 font-medium relative group ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'text-white hover:text-blue-400 hover:bg-white/10'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Icon size={18} className={`${isActive ? 'text-white' : 'text-white/70 group-hover:text-blue-400'}`} />
                  <span className="relative z-10">{item.name}</span>
                  
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Page;
  