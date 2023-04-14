import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type WidthProviderContext = {
  isMobile: boolean
}

const WidthContext = createContext<WidthProviderContext | null>(null);
export const useWidthContext = () => {
  const currentWidthContext = useContext(WidthContext);

  if (!currentWidthContext) {
    throw new Error(
      "WidthContext is null!"
    );
  }

  return currentWidthContext;
};


const WidthProvider: React.FC<{
  children: JSX.Element
}> = ({children}) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 420 ? true : false);
  const toggleWidth = () => {
    if(window.innerWidth <= 420){
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      toggleWidth()
    });
    return () => {
      window.removeEventListener("resize", toggleWidth);
    }
  }, []);

  return (
    <WidthContext.Provider value={{
      isMobile
    }}>
      {children}
    </WidthContext.Provider>
  );
}

export default WidthProvider;