import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RoleModeContextProps {
  currentMode: string;
  toggleMode: () => void;
  role: string;
  handleLogout: () => void;
  handleLogin: (role: string, mode: string) => void;
}

const RoleModeContext = createContext<RoleModeContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentMode, setCurrentMode] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    const savedRole = localStorage.getItem('role');

    if (savedMode && savedRole) {
      setCurrentMode(savedMode);
      setRole(savedRole);
    }
  }, []);

  const toggleMode = () => {
    setCurrentMode((prevMode) => {
      const newMode = prevMode === 'admin' ? 'user' : 'admin';
      localStorage.setItem('mode', newMode);
      return newMode;
    });
    router.push('/pages/dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/pages/login');
  };

  const handleLogin = (role: string, mode: string) => {
    localStorage.setItem('role', role);
    localStorage.setItem('mode', mode);
    setRole(role);
    setCurrentMode(mode);
    router.push('/pages/dashboard');
  };

  return (
    <RoleModeContext.Provider
      value={{ currentMode, toggleMode, role, handleLogout, handleLogin }}
    >
      {children}
    </RoleModeContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(RoleModeContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
