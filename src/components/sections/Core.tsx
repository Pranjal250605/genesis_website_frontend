import React from 'react';
import Starry from "@/components/ui/Starry";
import Core_img from "@/components/images/core_img.png";
import Crypto from "@/components/images/crypto.jpg";
import Product from "@/components/images/product.png";
import Reskill from "@/components/images/reskill.jpg";
import Tech from "@/components/images/tech.png";
import { Target, BarChart3, ShieldCheck, Clock } from 'lucide-react';

export default function Core() {
    const capabilities = [
        {
            title: "Product & Tech Sales",
            tag: "Software · Hardware",
            thumb: Product,
            icon: Target, // Matches your crosshair icon
            desc: "We connect innovative software and hardware solutions with the right markets through precision-driven sales execution and partnership development.",
            clients: "220+",
            projects: "580+"
        },
        {
            title: "Tech Project Outsourcing",
            tag: "Tailored to Your Needs",
            thumb: Tech,
            icon: BarChart3, // Matches your bar chart icon
            desc: "Custom-built technology solutions designed to meet the unique operational, strategic, and scalability requirements of modern enterprises. From concept to deployment, we deliver results with precision and reliability.",
            clients: "150+",
            projects: "340+"
        },
        {
            title: "Crypto & Blockchain",
            tag: "Secure · Scalable · Decentralized",
            thumb: Crypto,
            icon: ShieldCheck, // Matches your shield icon
            desc: "From Web3 strategy to blockchain implementation, we help businesses adopt decentralized technologies with confidence.",
            clients: "180+",
            projects: "420+"
        },
        {
            title: "Reskilling & Innovation",
            tag: "Driving Future Growth",
            thumb: Reskill,
            icon: Clock, // Matches your clock icon
            desc: "We prepare organizations and professionals for the evolving digital economy through structured reskilling programs and forward-thinking innovation initiatives designed to accelerate sustainable growth.",
            clients: "190+",
            projects: "500+"
        }
    ];

    return (
        <div className="relative min-h-screen bg-[#050505] py-24 px-10 overflow-hidden">
            <div className="relative z-10 w-full pb-40 max-w-8xl mx-auto">
                    <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-zinc-900/20 shadow-2xl p-12 lg:p-20">
                    
                        <div className="absolute inset-0 z-0">
                            <img 
                            src={Core_img} 
                            alt="Core Capabilities"
                            className="w-full h-full block object-cover blur-[5px] scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="absolute inset-0 backdrop-blur-[2px] opacity-20" />
                        </div>

                        <div className="relative z-10">
                            <div className="text-center mb-20">
                            <span className="text-amber-400 text-sm font-semibold uppercase tracking-[5px] mb-4 block">
                                genesis’
                            </span>
                            <h2 className="text-white text-5xl lg:text-6xl font-bold font-['Inter'] mb-6">
                                Core Capabilities
                            </h2>
                            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                                Comprehensive solutions engineered to drive digital transformation and competitive advantage
                            </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {capabilities.map((item, index) => (
                                    <div key={index} className="group relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden transition-all hover:border-amber-400/30 flex flex-col">
                                    
                                        <div className="relative h-60 w-full overflow-hidden border-b border-white/5">
                                            <img 
                                                src={item.thumb} 
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent opacity-60" />
                                        </div>

                                        {/* 2. CONTENT SECTION */}
                                        {/* Added flex, flex-col, and flex-1 to make this container fill available space */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="w-12 h-12 bg-white/10 rounded-[12px] flex justify-center items-center mb-6 shrink-0 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                                {/* Render the icon component dynamically */}
                                                <item.icon 
                                                    size={24} 
                                                    className="text-amber-400" 
                                                    strokeWidth={1.5} 
                                                />
                                            </div>

                                            <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                                            <span className="text-amber-400/80 text-[10px] uppercase tracking-widest mb-6 block font-medium">
                                                {item.tag}
                                            </span>
                                            
                                            <p className="text-white/60 text-sm leading-relaxed mb-10">
                                                {item.desc}
                                            </p>

                                            {/* Stats Footer */}
                                            {/* Added mt-auto to "push" this div to the bottom of the flex-1 container */}
                                            <div className="flex gap-8 pt-6 border-t border-white/5 mt-auto">
                                                <div>
                                                    <div className="text-amber-400 text-lg font-bold">{item.clients}</div>
                                                    <div className="text-white/40 text-[10px] uppercase tracking-tighter">Clients</div>
                                                </div>
                                                <div>
                                                    <div className="text-amber-400 text-lg font-bold">{item.projects}</div>
                                                    <div className="text-white/40 text-[10px] uppercase tracking-tighter">Projects</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
        </div>

        <Starry />
    </div>
  );
}