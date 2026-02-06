import { Link } from "@tanstack/react-router";
import { ChevronRight, Home, AlertCircle } from "lucide-react";

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-body text-slate-100">

            {/* Background Ambient Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">

                {/* 404 Display */}
                <div className="relative inline-block">
                    <h1 className="text-[12rem] leading-none font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-500 to-slate-900 select-none">
                        404
                    </h1>
                    <div className="absolute -top-4 -right-8 p-3 bg-red-500/10 rounded-full border border-red-500/20 text-red-500 animate-bounce">
                        <AlertCircle size={32} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Lost on the Track?
                    </h2>
                    <p className="text-lg text-slate-400 max-w-md mx-auto">
                        The page you are looking for seems to have drifted off course. Let's get you back to the starting line.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        to="/"
                        className="group flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 hover:scale-105 active:scale-95"
                    >
                        <Home size={18} />
                        <span>Return Home</span>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-950 transition-colors" />
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 backdrop-blur-sm"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-8 text-slate-600 text-sm font-medium">
                Error Code: 404_NOT_FOUND // LUXURY_RENTAL_SYSTEM
            </div>
        </div>
    );
};
