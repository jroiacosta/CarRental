import { useState } from "react";
import { Save, RefreshCw, Globe, Search, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";
import { TachometerLoader } from "../../../components/ui/CarLoader";

export const PortalSettings = () => {
    const [isSaving, setIsSaving] = useState(false);

    // General Settings State
    const [appName, setAppName] = useState("Vite Car Rental");
    const [supportEmail, setSupportEmail] = useState("support@carrental.com");
    const [currency, setCurrency] = useState("USD");

    // SEO Settings State
    const [metaTitle, setMetaTitle] = useState("Premium Car Rental Services");
    const [metaDescription, setMetaDescription] = useState("Rent luxury and sports cars at the best prices. Experience the thrill of driving premium vehicles.");
    const [keywords, setKeywords] = useState("car rental, luxury cars, sports cars, exotic rental");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSaving(false);
        toast.success("Settings saved successfully!");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">System Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage application configuration and SEO.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-900/20 disabled:opacity-50"
                >
                    {isSaving ? (
                        <>
                            <TachometerLoader size={18} />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                <LayoutTemplate size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">General Information</h3>
                                <p className="text-xs text-slate-500">Core application details.</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Application Name</label>
                                <input
                                    type="text"
                                    value={appName}
                                    onChange={(e) => setAppName(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Support Email</label>
                                    <input
                                        type="email"
                                        value={supportEmail}
                                        onChange={(e) => setSupportEmail(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Currency</label>
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                <Search size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">SEO Configuration</h3>
                                <p className="text-xs text-slate-500">Search engine optimization settings.</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Default Meta Title</label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Meta Description</label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500/50 transition-colors min-h-[100px]"
                                />
                                <p className="text-xs text-slate-400 mt-1 text-right">{metaDescription.length} / 160 characters</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Keywords (comma separated)</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="e.g. car, rental, travel"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-6 text-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-4">
                            <Globe size={32} className="text-slate-400" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Live Preview</h3>
                        <p className="text-sm text-slate-500 mb-6">Settings changes affect the live URL immediately after saving.</p>

                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 text-left">
                            <div className="flex gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-lg p-6 text-white text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto flex items-center justify-center mb-4 backdrop-blur-sm">
                            <RefreshCw size={24} className="text-white" />
                        </div>
                        <h3 className="font-bold mb-2">Auto-Deployment</h3>
                        <p className="text-white/80 text-sm">Changes trigger a cached rebuild of SEO metadata.</p>
                    </div>
                </div>
            </form>
        </div>
    );
};
