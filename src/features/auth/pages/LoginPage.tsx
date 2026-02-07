import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { auth } from "../../../common/auth";
import { CONFIG } from "../../../common/config";
import { Lock, User, ArrowRight, Loader2, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 800));

        // Admin Credentials
        if (username === "admin" && password === "123456") {
            auth.login(username, "admin");
            navigate({ to: "/portal/dashboard" });
            return;
        }

        // Renter Credentials
        if (username === "renter" && password === "123456") {
            auth.login(username, "renter");
            navigate({ to: "/renter/dashboard" });
            return;
        }

        // Legacy fallback or invalid
        if (username === CONFIG.AUTH.USERNAME && password === CONFIG.AUTH.PASSWORD && username !== "renter" && username !== "admin") {
            auth.login(username, "admin"); // Default legacy to admin
            navigate({ to: "/portal/dashboard" });
        } else {
            setError("Invalid credentials. Try 'admin' or 'renter' with pass '123456'");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-950 overflow-hidden font-body text-slate-100 relative">
            {/* Back to Home Button */}
            <div className="absolute top-6 left-6 z-50">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5 hover:border-white/20 text-sm font-medium group shadow-lg shadow-black/20"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>

            {/* Left Side - Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 -z-10 w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
                    <div className="absolute bottom-0 left-0 -z-10 w-[80%] h-[80%] bg-red-600/10 rounded-full blur-[120px] opacity-40" />
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2560&auto=format&fit=crop"
                        alt="Luxury Car Background"
                        className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 p-12 text-white max-w-lg"
                >
                    <img
                        src="/images/logo.png"
                        alt="Brand Logo"
                        className="w-16 h-16 object-contain mb-8"
                    />
                    <h1 className="text-5xl font-bold font-heading mb-6 leading-tight text-white">
                        Manage Your Fleet <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Confidence</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                        Access the centralized dashboard to manage bookings, cars, and customer relationships efficiently.
                    </p>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="flex -space-x-2">
                            {[
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
                            ].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                                />
                            ))}
                        </div>
                        <span>Trusted by 500+ Dealers</span>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative bg-slate-950">
                <div className="absolute inset-0 bg-slate-950" />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-slate-900/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/50 border border-white/5">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white font-heading">Welcome Back</h2>
                            <p className="text-slate-400 mt-2">Sign in to your dashboard account</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Username</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none font-medium placeholder:text-slate-600 text-white"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-semibold text-slate-300">Password</label>
                                    <a href="#" className="text-sm text-red-500 hover:text-red-400 font-semibold transition-colors" onClick={e => e.preventDefault()}>Forgot password?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-slate-950/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none font-medium placeholder:text-slate-600 text-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="p-3 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary py-4 text-base shadow-lg shadow-red-900/20 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed border border-red-500/50"
                            >
                                <span className={`flex items-center justify-center gap-2 transition-transform duration-200 ${isLoading ? 'translate-y-12' : ''}`}>
                                    Sign In <ArrowRight size={20} className="group-hover:translate-x-1" />
                                </span>

                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="animate-spin" size={24} />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-sm text-slate-500">
                                Don't have an account? <span className="text-slate-300 font-semibold cursor-pointer hover:text-white transition-colors">Contact Support</span>
                            </p>
                            <div className="mt-4 p-3 bg-slate-950/50 border border-white/5 rounded-lg inline-block text-left">
                                <p className="text-xs text-slate-500 font-mono">
                                    Admin: <span className="font-bold text-slate-400">admin</span> / <span className="font-bold text-slate-400">123456</span>
                                </p>
                                <p className="text-xs text-slate-500 font-mono mt-1">
                                    Renter: <span className="font-bold text-slate-400">renter</span> / <span className="font-bold text-slate-400">123456</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
