import UserContextProvider from "./src/contexts/UserContext";
import SocketProvider from "./src/contexts/SocketContext";
import UserDataProvider from "./src/contexts/UserDataContext";
interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <UserContextProvider>
      <UserDataProvider>
        <SocketProvider>{children}</SocketProvider>
      </UserDataProvider>
    </UserContextProvider>
  );
}
