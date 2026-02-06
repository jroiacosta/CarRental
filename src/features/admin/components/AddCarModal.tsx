import { X, CheckCircle2, DollarSign, Car } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileDropzone } from "../../../components/ui/FileDropzone";
import { TachometerLoader } from "../../../components/ui/CarLoader";
import { cn } from "../../../common/utils";
import { Car as CarType } from "../pages/PortalCars";

interface AddCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (data: Partial<CarType>) => void;
    initialData?: CarType;
}

export function AddCarModal({ isOpen, onClose, onSave, initialData }: AddCarModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [gallery, setGallery] = useState<File[]>([]);

    // Form states
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Sports");

    // Initialize/Reset form
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name);
                setPrice(initialData.price.toString());
                setCategory(initialData.category);
                setIsFeatured(!!initialData.featured);
                setImage(null); // Reset file inputs as we can't easily set them from URL
                setGallery([]);
            } else {
                setName("");
                setPrice("");
                setCategory("Sports");
                setIsFeatured(false);
                setImage(null);
                setGallery([]);
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !price) {
            toast.error("Please fill in the required fields.");
            return;
        }

        setIsSubmitting(true);

        // Simulate network request with our cool loader
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create blob URLs for uploaded files to simulate storage
        const imageUrl = image ? URL.createObjectURL(image) : initialData ? initialData.image : "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80";
        const galleryUrls = gallery.length > 0 ? gallery.map(f => URL.createObjectURL(f)) : initialData?.gallery || [];

        const carData: Partial<CarType> = {
            name,
            price: Number(price),
            category,
            featured: isFeatured,
            image: imageUrl,
            gallery: galleryUrls
        };

        if (onSave) onSave(carData);

        setIsSubmitting(false);
        toast.success(initialData ? `${name} updated successfully!` : `${name} added to fleet successfully!`);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-white font-heading">{initialData ? "Edit Vehicle" : "Add New Vehicle"}</h2>
                        <p className="text-sm text-slate-400">Enter styling and performance details.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Details */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Vehicle Name</label>
                                    <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                                        <Car size={16} className="text-slate-500" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Porsche 911 GT3"
                                            className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Daily Rate</label>
                                    <div className="flex items-center gap-3 bg-slate-950 border border-white/10 rounded-lg px-4 py-3 focus-within:border-red-500/50 transition-colors">
                                        <DollarSign size={16} className="text-slate-500" />
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="1200"
                                            className="bg-transparent text-white text-sm w-full outline-none placeholder-slate-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors hover:cursor-pointer"
                                    >
                                        <option>Sports</option>
                                        <option>Luxury</option>
                                        <option>Electric</option>
                                        <option>SUV</option>
                                        <option>Classic</option>
                                    </select>
                                </div>

                                {/* Featured Toggle */}
                                <div className="bg-slate-950/50 border border-white/5 rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:bg-slate-950 transition-colors" onClick={() => setIsFeatured(!isFeatured)}>
                                    <div className={cn(
                                        "w-6 h-6 rounded border flex items-center justify-center transition-all mt-0.5",
                                        isFeatured ? "bg-red-500 border-red-500" : "border-slate-600 bg-transparent"
                                    )}>
                                        {isFeatured && <CheckCircle2 size={14} className="text-white" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Feature this car?</p>
                                        <p className="text-xs text-slate-400 mt-1">This will be displayed in the hero section / welcome page.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Images */}
                            <div className="space-y-6">
                                <div>
                                    <div className="h-full">
                                        <FileDropzone
                                            label="Main Vehicle Image"
                                            onFileSelect={setImage}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="h-full">
                                        <FileDropzone
                                            label="Gallery Images"
                                            multiple={true}
                                            onFilesSelect={setGallery}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-4 flex items-center justify-end gap-3 border-t border-white/10 bg-slate-900 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn-primary py-2 px-6 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <TachometerLoader size={18} />
                                <span>{initialData ? "Updating..." : "Adding..."}</span>
                            </>
                        ) : (
                            <span>{initialData ? "Save Changes" : "Add to Fleet"}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
