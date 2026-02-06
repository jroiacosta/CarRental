export const CARS = [
    {
        id: "porsche-911-gt3-rs",
        name: "Porsche 911 GT3 RS",
        tagline: "Track-Ready Performance",
        category: "Supercar",
        price: 1200,
        image: "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMHIspbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCxkF%25vUqCNwuWXsOw3meV6iTCj%25zhRc2GRdqAZ%25oD21P%25S1BAXmenugTfeIJpV7nDhQT",
        gradient: "from-blue-600 to-purple-600",
        stats: { speed: "199 mph", accel: "2.7s", power: "518 hp" },
        rating: 5.0,
        gallery: [
            "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614162692292-0ac56d79753c?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1597687210386-a08b89d05664?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "The 911 GT3 RS delivers pure motorsport technology for the street. With its high-revving naturally aspirated engine and motorsport-derived aerodynamics, it offers an unfiltered driving experience.",
        features: ["Carbon Fiber Hood", "DRS Wing", "Track Precision App", "Ceramic Composite Brakes"]
    },
    {
        id: "ferrari-488-pista",
        name: "Ferrari 488 Pista",
        tagline: "Italian Masterpiece",
        category: "Supercar",
        price: 1350,
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop",
        gradient: "from-red-600 to-red-500",
        stats: { speed: "211 mph", accel: "2.85s", power: "710 hp" },
        rating: 5.0,
        gallery: [
            "https://images.unsplash.com/photo-1583121274602-3e2820c698d9?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "The 488 Pista marks a significant step forward in the dynamic history of Ferrari's V8 special series. It provides track-like performance on all kinds of roads.",
        features: ["Twin-Turbo V8", "Side Slip Control 6.0", "Carbon Fiber Wheels", "Alcantara Interior"]
    },
    {
        id: "mercedes-amg-gt",
        name: "Mercedes-AMG GT",
        category: "Grand Tourer",
        price: 350,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop",
        stats: { speed: "195 mph", accel: "3.1s", power: "577 hp" },
        gradient: "from-slate-500 to-slate-800", // Default gradient for non-hero
        rating: 4.9,
        tagline: "Performance Art",
        gallery: [
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "A machine built for the bold. The AMG GT combines racing performance with everyday usability, featured in a stunning grand tourer styling.",
        features: ["Biturbo V8", "AMG Ride Control", "Active Aerodynamics", "Burmester Surround Sound"]
    },
    {
        id: "mclaren-720s",
        name: "McLaren 720S",
        category: "Hypercar",
        price: 650,
        image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1600&auto=format&fit=crop",
        stats: { speed: "212 mph", accel: "2.8s", power: "710 hp" },
        gradient: "from-orange-500 to-red-500", // Default gradient
        rating: 5.0,
        tagline: "Raise Your Limits",
        gallery: [
            "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544605956-027581be442d?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "Lighter, stronger, faster. The 720S is a masterpiece of light and aerodynamic design, delivering blistering performance with incredible driver engagement.",
        features: ["Carbon Fiber Monocage II", "Proactive Chassis Control II", "Variable Drift Control", "Dihedral Doors"]
    }
];
