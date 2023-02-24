import styled from "styled-components";
import { MessagesState } from "../../../features/messages/messagesSlice";
import File from "../FileMessage/File";
import RecievedFileMessage from "../FileMessage/RecievedFileMessage";

const MessageBoxUser = styled.div`
background: ${({ theme }) => theme.message};
display: flex;
justify-content: center;
align-items: center;
border-radius: 12px 12px 0 12px;
min-height: 44px;
padding: 0 8px;
margin-bottom: 7px;
max-width: 70%;
white-space: normal;
word-break:break-all;
margin-left: auto;
flex-shrink: 0;
color: white;
word-break: break-word;
`;

const MessageBoxFriend = styled(MessageBoxUser)`
background: ${({ theme }) => theme.messageFriend};
margin-left: inherit;
margin-right: auto;
border-radius: 0 12px 12px 12px;
color: ${({ theme }) => theme.messageColor};
`;

const Message = styled.p`
margin-right: 10px;
font-size: 16px;
padding: 10px 0;
`;

const MessageTimeContainer = styled.div`
flex-shrink: 0;
display: flex;
align-items: end;
justify-content: center;
height: 100%;
padding-bottom: 5px;
`;

const MessageTimeUser = styled.p`
color: white;
font-size: 10px;
`;

const MessageTimeFriend = styled(MessageTimeUser)`
color: #96989d;
`;

interface Messages extends MessagesState {
  userId: number,
  lastMessageRef: any
}

const Messages: React.FC<Messages> = ({messages, userId, lastMessageRef}) => {

  return(
    <>
      {messages.map((message, index) => {
        let createdAt = new Date(message.created_at).toLocaleTimeString();
        createdAt = createdAt.slice(0, 5);
        if(message.sender_id === userId){
          if(message.message_type !== 'file'){
            return(
              <MessageBoxUser ref={messages.length === index + 1 ? lastMessageRef : null} key={message.message_id}>
                <Message>{message.message}</Message>
                <MessageTimeContainer>
                  <MessageTimeUser>{createdAt}</MessageTimeUser>
                </MessageTimeContainer>
              </MessageBoxUser>
            )
          }
        } else { 
          if(message.message_type === 'file'){
            return (
              <MessageBoxFriend ref={messages.length === index + 1 ? lastMessageRef : null} key={message.message_id}>
                <RecievedFileMessage 
                  attachments={message.attachments}
                  text={message.message}
                />
                <MessageTimeContainer>
                  <MessageTimeFriend>{createdAt}</MessageTimeFriend>
                </MessageTimeContainer>
              </MessageBoxFriend>
            )
          }
          return(
            <MessageBoxFriend ref={messages.length === index + 1 ? lastMessageRef : null} key={message.message_id}>
              <Message>{message.message}</Message>
              <MessageTimeContainer>
                <MessageTimeFriend>{createdAt}</MessageTimeFriend>
              </MessageTimeContainer>
            </MessageBoxFriend>
          )
        } 
      })}
    </>
  )
}

export default Messages;