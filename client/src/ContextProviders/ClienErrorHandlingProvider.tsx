import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ErrorPopUpContext = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  errorMessage: string,
  setErrorMessage: Dispatch<SetStateAction<string>>
}

 const ErrorPopUpContext = createContext<ErrorPopUpContext | null>(null);
export const useErrorPopUpContext = () => {
  const currentErrorPopUpContext = useContext(ErrorPopUpContext);

  if (!currentErrorPopUpContext) {
    throw new Error(
      "ErrorPopUpContext is null!"
    );
  }

  return currentErrorPopUpContext;
};


const ClienErrorHandlingProvider: React.FC<{
  children: JSX.Element
}> = ({children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <ErrorPopUpContext.Provider value={{
      isOpen,
      setIsOpen,
      errorMessage,
      setErrorMessage
    }}>
      {children}
    </ErrorPopUpContext.Provider>
  );
}

export default ClienErrorHandlingProvider;