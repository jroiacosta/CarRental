import { useState } from "react";
import { User, Mail, Phone, Lock, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { FileDropzone } from "../../../components/ui/FileDropzone";
import { TachometerLoader } from "../../../components/ui/CarLoader";

export const RenterProfile = () => {
    const [isSavingInfo, setIsSavingInfo] = useState(false);
    const [isSavingSecurity, setIsSavingSecurity] = useState(false);

    // Profile Info State
    const [avatar, setAvatar] = useState<File | null>(null);
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");

    // Security State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingInfo(true);
        // Simulate API call
        console.log("Saving avatar:", avatar); // Fix unused variable
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSavingInfo(false);
        toast.success("Profile information updated successfully!");
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        setIsSavingSecurity(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSavingSecurity(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully!");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Completion Status */}
            <div className="bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500 text-white rounded-full shadow-lg shadow-red-500/20">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Profile Completion</h3>
                        <p className="text-slate-400 text-sm">Complete your profile to unlock premium benefits.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex-1 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-[85%]" />
                    </div>
                    <span className="text-white font-bold">85%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Personal Information */}
                <form onSubmit={handleSaveInfo} className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <User size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Personal Information</h3>
                                <p className="text-xs text-slate-500">Manage your personal details.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6 flex-1">
                        {/* Avatar */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Profile Photo</label>
                            <FileDropzone
                                onFileSelect={setAvatar}
                                label=""
                                maxSize={2 * 1024 * 1024}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-3.5 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-3.5 text-slate-500" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5 bg-white/5">
                        <button
                            type="submit"
                            disabled={isSavingInfo}
                            className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-900/20 disabled:opacity-50"
                        >
                            {isSavingInfo ? (
                                <>
                                    <TachometerLoader size={18} />
                                    <span>Updating Info...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Save Information</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Security Settings */}
                <form onSubmit={handleUpdatePassword} className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Security Settings</h3>
                                <p className="text-xs text-slate-500">Update your password.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6 flex-1">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5 bg-white/5">
                        <button
                            type="submit"
                            disabled={isSavingSecurity}
                            className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-900/20 disabled:opacity-50"
                        >
                            {isSavingSecurity ? (
                                <>
                                    <TachometerLoader size={18} />
                                    <span>Updating Password...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Update Password</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
