import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type FileLoadType = {
  percentCompleted: number,
  setPercentCompleted: Dispatch<SetStateAction<number>>,
}

const FileLoadContext = createContext<FileLoadType | null>(null);
export const useFileLoadContext = () => {
  const currentFileLoadContext = useContext(FileLoadContext);

  if (!currentFileLoadContext) {
    throw new Error(
      "FileLoadContext is null!"
    );
  }

  return currentFileLoadContext;
};

const FileLoadProvider: React.FC<{
  children: JSX.Element
}> = ({children}) => {
  const [percentCompleted, setPercentCompleted] = useState<number>(-1);

  return (
    <FileLoadContext.Provider value={{
      percentCompleted, 
      setPercentCompleted
    }}>
      {children}
    </FileLoadContext.Provider>
  );
}

export default FileLoadProvider;