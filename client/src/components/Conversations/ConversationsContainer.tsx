import { useRef, useState } from 'react';
import ConverationPresentational from './ConverationPresentational';
import io from 'socket.io-client';


const ConversationsContainer: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Array<string>>([]);

  const messagesInput = useRef<HTMLInputElement>(null);
  let input: HTMLInputElement = messagesInput.current!;

  const sendMessage = (): void => {
    if (input.value != ""){
      setMessages([...messages, input.value]);
      input.value = '';
      input.focus();
    }
  }
  const handleKeypress = (e: { key: string; }): void => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
  const handleBlur = (): void => {
    input.focus();
  }

  return (
    <ConverationPresentational 
      messages={messages}
      handleBlur={handleBlur}
      messagesInput={messagesInput}
      handleKeypress={handleKeypress}
      sendMessage={sendMessage}
    />
  )
}
export default ConversationsContainer;
