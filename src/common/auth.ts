const STORAGE_KEY = "car_rental_auth";

export const auth = {
    isAuthenticated: () => {
        return !!localStorage.getItem(STORAGE_KEY);
    },
    login: (username: string, role: 'admin' | 'renter' = 'renter') => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, role, loginTime: Date.now() }));
    },
    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
    },
    getUser: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },
    getRole: (): 'admin' | 'renter' | null => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        try {
            const parsed = JSON.parse(data) as any;
            return (parsed.role as 'admin' | 'renter') ?? null;
        } catch {
            return null;
        }
    }
};
