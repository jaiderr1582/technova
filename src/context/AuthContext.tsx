import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/User';

// Define the shape of the authentication context for type safety
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create a context with an undefined initial value to enable runtime validation
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider wraps the app and manages global authentication state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simulate authentication with hardcoded credentials (for demo purposes only)
  const login = async (email: string, password: string) => {
    if (email === 'admin@technova.com' && password === '123') {
      setUser({ name: 'Admin', email, role: 'admin' });
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  // Clear user session by resetting state to null
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to safely consume the auth context anywhere in the app
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}