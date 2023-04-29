import { JsxElement } from "typescript";
import useSocketSetup from "../hooks/useSocketSetup";
import { useAppSelector } from "../app/hooks";
import { useGetConversationsAndMessages } from "../hooks/fetchHooks/messanger/useGetConversationsAndMessages";

const MobileInterlayer: React.FC<{children: JsxElement}> = ({children}) => {
  useSocketSetup();
  const userConversations = useAppSelector((state) => state.userConversations);
  useGetConversationsAndMessages(userConversations);
  
  return (
    <>
      {children}
    </>
  )
}

export default MobileInterlayer;