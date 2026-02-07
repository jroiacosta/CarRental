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
        transmission: "7-Speed PDK",
        rating: 5.0,
        totalReviews: 24,
        gallery: [
            "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614162692292-0ac56d79753c?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1597687210386-a08b89d05664?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "The 911 GT3 RS delivers pure motorsport technology for the street. With its high-revving naturally aspirated engine and motorsport-derived aerodynamics, it offers an unfiltered driving experience.",
        features: ["Carbon Fiber Hood", "DRS Wing", "Track Precision App", "Ceramic Composite Brakes"],
        safetyFeatures: ["Adaptive Cruise Control", "Lane Keep Assist", "Traffic Sign Recognition", "Surround View"],
        connectivity: ["Apple CarPlay", "Porsche Connect", "Burmester Audio", "Navigation Plus"],
        reviews: [
            {
                userName: "Michael Chen",
                userImage: "https://i.pravatar.cc/150?u=michael",
                rating: 5,
                date: "Jan 12, 2024",
                comment: "The most incredible driving experience of my life. The aero on this thing is unreal."
            },
            {
                userName: "Sarah Jenkins",
                userImage: "https://i.pravatar.cc/150?u=sarah",
                rating: 5,
                date: "Dec 28, 2023",
                comment: "Rented this for my husband's 40th. The service was top-notch and the car was spotless."
            }
        ]
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
        transmission: "7-Speed Dual-Clutch",
        rating: 5.0,
        totalReviews: 18,
        gallery: [
            "https://images.unsplash.com/photo-1583121274602-3e2820c698d9?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "The 488 Pista marks a significant step forward in the dynamic history of Ferrari's V8 special series. It provides track-like performance on all kinds of roads.",
        features: ["Twin-Turbo V8", "Side Slip Control 6.0", "Carbon Fiber Wheels", "Alcantara Interior"],
        safetyFeatures: ["F1-Trac", "E-Diff3", "High-Performance ABS", "Rear Parking Camera"],
        connectivity: ["Ferrari Infotainment", "Bluetooth Streaming", "Premium Hi-Fi System"],
        reviews: [
            {
                userName: "Luca Rossi",
                userImage: "https://i.pravatar.cc/150?u=luca",
                rating: 5,
                date: "Feb 02, 2024",
                comment: "An absolute beast. The sound of that V8 is something everyone should hear once."
            }
        ]
    },
    {
        id: "mercedes-amg-gt",
        name: "Mercedes-AMG GT",
        category: "Grand Tourer",
        price: 350,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop",
        stats: { speed: "195 mph", accel: "3.1s", power: "577 hp" },
        transmission: "9-Speed MCT",
        gradient: "from-slate-500 to-slate-800",
        rating: 4.9,
        totalReviews: 42,
        tagline: "Performance Art",
        gallery: [
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1600&auto=format&fit=crop"
        ],
        description: "A machine built for the bold. The AMG GT combines racing performance with everyday usability, featured in a stunning grand tourer styling.",
        features: ["Biturbo V8", "AMG Ride Control", "Active Aerodynamics", "Burmester Surround Sound"],
        safetyFeatures: ["Active Brake Assist", "Blind Spot Assist", "Pre-Safe System", "Adaptive Highbeam"],
        connectivity: ["MBUX Infotainment", "Smartphone Integration", "Wireless Charging", "Digital Cockpit"],
        reviews: Array.from({ length: 42 }).map((_, i) => ({
            id: i + 1,
            userName: [
                "James Wilson", "Sophia Martinez", "David Thompson", "Emma Garcia", "Robert Miller",
                "Olivia Anderson", "William Taylor", "Isabella Moore", "Richard Jackson", "Mia White",
                "Joseph Harris", "Charlotte Martin", "Thomas Lee", "Amelia Perez", "Charles Clark",
                "Evelyn Lewis", "Christopher Robinson", "Abigail Walker", "Daniel Hall", "Harper Young",
                "Matthew Allen", "Emily King", "Anthony Wright", "Elizabeth Scott", "Mark Green",
                "Sofia Baker", "Donald Adams", "Avery Nelson", "Steven Hill", "Ella Ramirez",
                "Paul Campbell", "Scarlett Mitchell", "Andrew Roberts", "Victoria Carter", "Kenneth Phillips",
                "Luna Evans", "Joshua Turner", "Grace Torres", "Kevin Parker", "Chloe Collins",
                "Brian Edwards", "Layla Stewart"
            ][i],
            userImage: `https://i.pravatar.cc/150?u=${i}`,
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' }),
            comment: [
                "Great balance of luxury and performance. The interior is beautiful.",
                "Absolutely stunning car. The acceleration is linear and smooth.",
                "Best rental experience ever. The AMG GT is a beast.",
                "Pure class. This car turns heads everywhere you go.",
                "The exhaust note is addictive. I didn't want to give it back.",
                "Comfortable for long drives, yet aggressive when you want it to be.",
                "Exceptional handling. It stays glued to the road in corners.",
                "Top-tier technology. The MBUX system is very intuitive.",
                "The perfect grand tourer. Fast, stylish, and comfortable.",
                "Incredible engineering. Mercedes really nailed this one.",
                "Rented this for a weekend getaway. It was perfect.",
                "Powerful V8 engine. The sound is music to my ears.",
                "Luxury at its finest. Every detail is carefully thought out.",
                "A true driver's car. The feedback from the steering is amazing.",
                "Highly recommend this car for any car enthusiast.",
                "The design is timeless. It looks even better in person.",
                "Superb performance. It exceeded all my expectations.",
                "Great service and even better car. Will rent again!",
                "The GT is both elegant and aggressive. A rare combination.",
                "A masterpiece of German engineering. Truly impressive.",
                "So much fun to drive. The power delivery is instant.",
                "The interior feels like a cockpit. Very high quality.",
                "A head-turner in every sense of the word.",
                "The best V8 engine I've ever experienced.",
                "Smooth handling even at high speeds.",
                "The Burmester sound system is phenomenal.",
                "I felt like a superstar driving this through the city.",
                "Excellent value for such a high-end supercar.",
                "The active aero really makes a difference.",
                "The transmission is lightning fast. No lag at all.",
                "A perfect blend of comfort and raw power.",
                "My dream car. Getting to rent it was amazing.",
                "The brakes are incredibly responsive. Very safe feel.",
                "Beautiful sunset drive in this AMG. Unforgettable.",
                "The attention to detail in the AMG interior is stunning.",
                "Responsive, loud, and incredibly fast. Love it!",
                "The drive modes allow you to customize the experience perfectly.",
                "A true grand tourer. Effortless power for long distances.",
                "The most comfortable sport seats I've ever sat in.",
                "The cockpit layout is perfect for performance driving.",
                "What a machine! The torque is just relentless.",
                "Simply the best car in the fleet. Period."
            ][i]
        }))
    },
    {
        id: "mclaren-720s",
        name: "McLaren 720S",
        category: "Hypercar",
        price: 650,
        image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1600&auto=format&fit=crop",
        stats: { speed: "212 mph", accel: "2.8s", power: "710 hp" },
        transmission: "7-Speed SSG",
        gradient: "from-orange-500 to-red-500",
        rating: 5.0,
        totalReviews: 12,
        tagline: "Raise Your Limits",
        gallery: [
            "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1600&auto=format&fit=crop",
            "https://www.netcarshow.com/McLaren-720S_Spider_by_MSO-2019-1280-d7cc40c05c4bd5bfec26dff79024806919.jpg?token=ec59994be11a4092ace34c6f311e96840c26cd03ce86600d6c252b0",
        ],
        description: "Lighter, stronger, faster. The 720S is a masterpiece of light and aerodynamic design, delivering blistering performance with incredible driver engagement.",
        features: ["Carbon Fiber Monocage II", "Proactive Chassis Control II", "Variable Drift Control", "Dihedral Doors"],
        safetyFeatures: ["Static Adaptive Headlights", "Carbon Ceramic Brakes", "Parking Sensors", "Tyre Pressure Monitoring"],
        connectivity: ["McLaren Infotainment", "Bowers & Wilkins Audio", "Telemetry App"],
        reviews: [
            {
                userName: "Emma Thompson",
                userImage: "https://i.pravatar.cc/150?u=emma",
                rating: 5,
                date: "Feb 05, 2024",
                comment: "Feels like a spaceship. Every time I get in, it's an event."
            }
        ]
    }
];
