import { APP_CONFIG } from "../../../config/constants";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block">Get in Touch</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                        Contact Us
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Have questions or ready to book your dream car? enhancing your journey is our priority.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-red-500/30 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-6">{APP_CONFIG.COMPANY_NAME}</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Our Location</h4>
                                        <p className="text-slate-400 leading-relaxed">
                                            {APP_CONFIG.CONTACT.ADDRESS.CITY}<br />
                                            and surrounding areas
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Phone Number</h4>
                                        <p className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                                            {APP_CONFIG.CONTACT.PHONE}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">Mon-Sun: 8am - 8pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Email Address</h4>
                                        <p className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                                            {APP_CONFIG.CONTACT.EMAIL}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 border border-white/10 p-8 rounded-2xl shadow-xl shadow-black/20"
                    >
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                                    placeholder="Tell us about which car you're interested in..."
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2 group">
                                Send Message
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
