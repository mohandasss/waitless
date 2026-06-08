import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  phoneNumber: string;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (phoneNumber: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phoneNumber: "",
      isAuthenticated: false,
      isLoading: false,
        
      login: (phoneNumber) =>
        set({                         
          phoneNumber,  
          isAuthenticated: true,    
        }),                               

      logout: () =>         
        set({                     
          phoneNumber: "",      
          isAuthenticated: false,     
        }),                                   

      setLoading: (loading) =>    
        set({                     
          isLoading: loading,
        }),
    }),
    {
      name: "auth-storage", 
    }
  )
);