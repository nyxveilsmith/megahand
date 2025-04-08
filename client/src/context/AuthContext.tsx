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
      console.log("Attempting login with:", { username, password });
      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      
      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error("Error data:", errorData);
        
        toast({
          title: "Login failed",
          description: "Invalid username or password. Use 'admin' and 'password'",
          variant: "destructive",
        });
        
        return false;
      }
      
      const data = await response.json();
      console.log("Login successful:", data);
      
      setIsAuthenticated(true);
      setUsername(data.username || username);
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login failed",
        description: "Please try username 'admin' and password 'password'",
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
