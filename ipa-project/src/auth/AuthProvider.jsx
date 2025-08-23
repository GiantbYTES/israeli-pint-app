import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../data/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ onAuthReady, children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data && data.session && data.session.user) {
        setActiveUser(data.session.user);
      }
      setLoading(false);
      if (onAuthReady) onAuthReady();
    };
    fetchSession();
  }, []);

  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return error;
    } else {
      setActiveUser(data.user);
      navigate("/business-dashboard");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      throw error;
    } else {
      setActiveUser(null);
      navigate("/");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ activeUser, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
