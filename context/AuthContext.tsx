import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  handleRegister: (form: { [key: string]: string }) => Promise<void>;
  handleLogin: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const handleRegister = async (form: { [key: string]: string }) => {
    const { username, password } = form;
    try {
      const response = await axios.post("https://localhost:3000/user/create", {
        username,
        password,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://localhost:3000/user/login", {
        username,
        password,
      });
      console.log("Login response:", response.data);
      //   setUser(response.data);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
    setUser({ username });
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
