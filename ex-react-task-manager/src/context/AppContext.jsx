import { createContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);
