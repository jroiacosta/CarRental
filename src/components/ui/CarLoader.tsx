import { cn } from "../../common/utils";

interface CarLoaderProps {
    className?: string;
    size?: number;
}

export function CarLoader({ className, size = 24 }: CarLoaderProps) {
    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full text-slate-500"
            >
                {/* Gauge Arc */}
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" className="opacity-0" /> {/* Hidden bg path for sizing if needed, or remove */}
                <path d="M19 18a10 10 0 0 0-14 0" /> {/* Outer Arc */}
            </svg>

            {/* Needle */}
            <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 w-full h-full animate-revving"
                style={{ transformOrigin: "bottom center" }}
            >
                <line
                    x1="12" y1="14"
                    x2="12" y2="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-red-500 origin-center"
                />
                <circle cx="12" cy="14" r="2" fill="currentColor" className="text-red-500" />
            </svg>

            <style>
                {`
                @keyframes revving {
                    0% { transform: rotate(-60deg); }
                    15% { transform: rotate(40deg); }
                    30% { transform: rotate(-20deg); }
                    45% { transform: rotate(60deg); }
                    60% { transform: rotate(0deg); }
                    75% { transform: rotate(50deg); }
                    100% { transform: rotate(-60deg); }
                }
                .animate-revving {
                    animation: revving 2s ease-in-out infinite;
                    transform-origin: 12px 14px;
                }
                `}
            </style>
        </div>
    );
}

// Improved version with cleaner SVG geometry for a Tachometer
export function TachometerLoader({ className, size = 24 }: CarLoaderProps) {
    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
            >
                {/* Gauge Track */}
                <path
                    d="M 20 80 A 40 40 0 1 1 80 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-slate-600"
                />

                {/* Red Zone */}
                <path
                    d="M 68.28 28.28 A 40 40 0 0 1 80 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-red-600 opacity-80"
                />

                {/* Ticks (Simplified) */}
                <line x1="50" y1="15" x2="50" y2="25" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                <line x1="20" y1="80" x2="30" y2="75" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                <line x1="80" y1="80" x2="70" y2="75" stroke="currentColor" strokeWidth="2" className="text-slate-400" />

                {/* Needle Group */}
                <g className="animate-gauge-rev">
                    <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-red-500" />
                    <circle cx="50" cy="50" r="6" fill="currentColor" className="text-slate-200" />
                </g>
            </svg>

            <style>
                {`
                @keyframes gauge-rev {
                    0% { transform: rotate(-130deg); }
                    10% { transform: rotate(-130deg); }
                    20% { transform: rotate(20deg); }   /* REV UP */
                    25% { transform: rotate(0deg); }
                    30% { transform: rotate(100deg); }  /* REDLINE */
                    35% { transform: rotate(80deg); }
                    40% { transform: rotate(110deg); }  /* PEAK */
                    50% { transform: rotate(-40deg); }  /* DROP */
                    60% { transform: rotate(-130deg); } /* IDLE */
                    70% { transform: rotate(-120deg); } /* IDLE RUMBLE */
                    80% { transform: rotate(-130deg); }
                    90% { transform: rotate(-125deg); }
                    100% { transform: rotate(-130deg); }
                }
                .animate-gauge-rev {
                    transform-origin: 50px 50px;
                    animation: gauge-rev 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                `}
            </style>
        </div>
    )
}
