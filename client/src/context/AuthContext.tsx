import { createContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  login: async () => false,
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });
        
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.isAuthenticated);
          setUsername(data.username || null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await apiRequest("POST", "/api/login", { username, password });
      const data = await res.json();
      
      setIsAuthenticated(true);
      setUsername(data.username);
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiRequest("POST", "/api/logout", {});
      
      setIsAuthenticated(false);
      setUsername(null);
      
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
