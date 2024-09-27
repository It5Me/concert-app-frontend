import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RoleModeContextProps {
  currentMode: string;
  toggleMode: () => void;
  role: string;
  userId: number | null;
  handleLogout: () => void;
  handleLogin: (role: string, mode: string, userId: number) => void;
  loading: boolean;
}

const RoleModeContext = createContext<RoleModeContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentMode, setCurrentMode] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    const savedRole = localStorage.getItem('role');
    const savedUserId = localStorage.getItem('userId');

    if (savedMode && savedRole && savedUserId) {
      setCurrentMode(savedMode);
      setRole(savedRole);
      setUserId(parseInt(savedUserId, 10));
    } else {
      router.push('/pages/login');
    }

    setLoading(false);
  }, [router]);

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
    setUserId(null);
    router.push('/pages/login');
  };

  const handleLogin = (role: string, mode: string, userId: number) => {
    localStorage.setItem('role', role);
    localStorage.setItem('mode', mode);
    localStorage.setItem('userId', userId.toString());
    setRole(role);
    setCurrentMode(mode);
    setUserId(userId);
    router.push('/pages/dashboard');
  };

  return (
    <RoleModeContext.Provider
      value={{
        currentMode,
        toggleMode,
        role,
        userId,
        handleLogout,
        handleLogin,
        loading,
      }}
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
