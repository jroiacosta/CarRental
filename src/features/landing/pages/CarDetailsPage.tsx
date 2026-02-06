import { useParams, Link } from "@tanstack/react-router";
import { CARS } from "../data/cars";
import { Header } from "../components/Header";
import { BookingForm } from "../components/BookingForm";
import { ArrowLeft, CheckCircle2, Gauge, Zap, Fuel, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "../../../components/ui/Lightbox";

const CarDetailsPage = () => {
    // Basic ID matching - in production rely on router loader or stricter types
    const { carId } = useParams({ from: '/cars/$carId' });
    const car = CARS.find((c) => c.id === carId);

    const [imgIndex, setImgIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!car) {
        return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Car Not Found</div>;
    }

    const gallery = [car.image, ...(car.gallery || [])];


    return (
        <div className="min-h-screen bg-slate-950 font-body text-slate-200">
            <Header />

            {/* Breadcrumb / Back */}
            <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium mb-4">
                    <ArrowLeft size={16} className="mr-2" /> Back to Fleet
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">{car.name}</h1>
                <p className="text-xl text-red-500 mt-2 font-medium flex items-center gap-2">
                    <span className="text-slate-400 text-lg">from</span> ${car.price} <span className="text-slate-400 text-lg">/ day</span>
                </p>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Gallery & Details (Span 2) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Main Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setLightboxOpen(true)}>
                                <img
                                    src={gallery[imgIndex]}
                                    alt={car.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={48} />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setImgIndex(idx)}
                                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${idx === imgIndex ? 'border-red-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="text-center border-r border-white/10">
                                <Zap className="mx-auto text-red-500 mb-2" size={24} />
                                <p className="text-2xl font-bold text-white font-heading">{car.stats.accel}</p>
                                <p className="text-xs text-slate-500 uppercase">0-60 MPH</p>
                            </div>
                            <div className="text-center border-r border-white/10">
                                <Gauge className="mx-auto text-red-500 mb-2" size={24} />
                                <p className="text-2xl font-bold text-white font-heading">{car.stats.speed}</p>
                                <p className="text-xs text-slate-500 uppercase">Top Speed</p>
                            </div>
                            <div className="text-center">
                                <Fuel className="mx-auto text-red-500 mb-2" size={24} />
                                <p className="text-2xl font-bold text-white font-heading">{car.stats.power}</p>
                                <p className="text-xs text-slate-500 uppercase">Horsepower</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Vehicle Overview</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {car.description || "Experience the thrill of driving this engineering masterpiece. Perfect for special occasions, weekend getaways, or checking off your bucket list."}
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {car.features?.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-900 border border-white/5 p-4 rounded-lg">
                                        <CheckCircle2 size={20} className="text-red-500 flex-shrink-0" />
                                        <span className="text-slate-300 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form (Span 1) */}
                    <div>
                        <BookingForm carName={car.name} />
                    </div>
                </div>
            </main>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={gallery}
                    initialIndex={imgIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </div>
    )
}

export default CarDetailsPage;
