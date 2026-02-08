import React from 'react';
import Logo from '@/components/images/logo.png';
import { Globe, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex h-20 w-full max-w-[1440px] items-center justify-between rounded-[40px] border border-white/10 bg-zinc-950/20 px-10 shadow-2xl backdrop-blur-xl">
        
        <div className="flex items-center gap-4">
            <img 
                src={Logo}
                alt="Main Logo" 
                className="h-12 w-auto object-contain" 
            />
            
            <div className="h-8 w-[2px] bg-amber-400/20" />
            
            <div className="flex flex-col justify-center">
                <span className="font-['Montserrat'] text-[12px] font-medium uppercase tracking-wider text-amber-400/80">
                Technology Pioneers
                </span>
                <span className="font-['Inter'] text-[10px] text-white/30 tracking-tight">
                Est. 2024
                </span>
            </div>
        </div>

        <div className="flex items-center gap-6 ">
            <div className="flex items-center gap-2 cursor-pointer group">
                <Globe 
                    size={20} 
                    className="text-white/50 group-hover:text-white transition-colors" 
                    strokeWidth={1.5}
                />
                <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                EN
                </span>
            </div>

            <div className="h-6 w-[2px] bg-white/10" />

            <button className="
                px-4 py-2 rounded-full 
                bg-white/5 backdrop-blur-md 
                border border-white/20 
                text-sm font-medium text-white/50 
                transition-all duration-300
                hover:bg-white/20 hover:text-white
                active:scale-95 cursor-pointer
            ">
                Contact Us
            </button>

            <div className="h-6 w-[2px] bg-white/10" />

            <button className="flex items-center gap-3 group cursor-pointer">
                <span className="font-['Montserrat'] text-sm font-semibold text-amber-400 transition-opacity group-hover:opacity-80">
                Menu
                </span>
                <Menu 
                    size={28} 
                    className="text-amber-400 transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" 
                    strokeWidth={2}
                />
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;