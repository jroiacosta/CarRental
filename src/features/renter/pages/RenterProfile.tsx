import { useState, useRef, useEffect } from "react";
import { User, Mail, Phone, Lock, Save, ShieldCheck, Camera, X } from "lucide-react";
import { toast } from "sonner";
import { TachometerLoader } from "../../../components/ui/CarLoader";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPT_AVATAR = "image/jpeg,image/png,image/webp,image/gif";

export const RenterProfile = () => {
    const [isSavingInfo, setIsSavingInfo] = useState(false);
    const [isSavingSecurity, setIsSavingSecurity] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Info State
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");

    useEffect(() => {
        if (!avatar) {
            if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
            setAvatarPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(avatar);
        setAvatarPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [avatar]);

    // Security State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please choose an image file (JPEG, PNG, WebP, or GIF).");
            return;
        }
        if (file.size > MAX_AVATAR_SIZE) {
            toast.error("Image must be under 2MB.");
            return;
        }
        setAvatar(file);
        e.target.value = "";
    };

    const removeAvatar = () => {
        setAvatar(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingInfo(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
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
                <form onSubmit={handleSaveInfo} className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                    <div className="p-6 sm:p-8 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                <User size={24} className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-heading font-bold text-white">Personal Information</h3>
                                <p className="text-sm text-slate-500 mt-0.5">Update your profile and photo.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-8">
                        {/* Profile photo with preview */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block sm:mb-0">Profile Photo</label>
                            <div className="flex items-center gap-6">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept={ACCEPT_AVATAR}
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative group shrink-0 w-28 h-28 rounded-full overflow-hidden border-2 border-dashed border-white/20 hover:border-red-500/50 bg-slate-950 flex items-center justify-center transition-colors"
                                >
                                    {avatarPreviewUrl ? (
                                        <img
                                            src={avatarPreviewUrl}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-slate-500 group-hover:text-slate-400 transition-colors">
                                            <Camera size={28} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                </button>
                                <div className="flex flex-col gap-2">
                                    {avatarPreviewUrl ? (
                                        <>
                                            <p className="text-sm text-slate-400">Preview ready. Save to update.</p>
                                            <button
                                                type="button"
                                                onClick={removeAvatar}
                                                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
                                            >
                                                <X size={14} />
                                                Remove photo
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-sm text-slate-500">JPG, PNG or WebP. Max 2MB.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors placeholder-slate-600"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors placeholder-slate-600"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors placeholder-slate-600"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors placeholder-slate-600"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 border-t border-white/10 bg-slate-950/30">
                        <button
                            type="submit"
                            disabled={isSavingInfo}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSavingInfo ? (
                                <>
                                    <TachometerLoader size={18} />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Information
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
