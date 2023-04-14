import styled from "styled-components";
import { MessagesState } from "../../../features/messages/messagesSlice";
import RecievedFileMessage from "../FileMessage/RecievedFileMessage";
import SentFileMessages from "../FileMessage/SentFileMessages";

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
@media (max-width: 420px){
  max-width: 80%;
  border-radius: 8px 8px 0 8px;
}
`;

const MessageBoxFriend = styled(MessageBoxUser)`
  background: ${({ theme }) => theme.messageFriend};
  margin-left: inherit;
  margin-right: auto;
  border-radius: 0 12px 12px 12px;
  color: ${({ theme }) => theme.messageColor};
  max-width: 60%;
  @media (max-width: 420px){
    max-width: 80%;
    border-radius: 0 8px 8px 8px;
  }
`;

const Message = styled.p`
margin-right: 10px;
font-size: 16px;
padding: 10px 0;
`;

const MessageTimeContainer = styled.div`
width: 30px;
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
  lastMessageRef: any,
}

const Messages: React.FC<Messages> = ({messages, userId, lastMessageRef}) => {
  var sentFileCounter = 0;

  return(
    <>
      {messages.map((message, index) => {
        let createdAt = new Date(message.created_at).toLocaleTimeString();
        createdAt = createdAt.slice(0, 5);
        if(message.sender_id === userId){
          if(message.message_type !== 'file'){
            return(
              <MessageBoxUser ref={messages.length === index + 1 ? lastMessageRef : null} key={index}>
                <Message>{message.message}</Message>
                <MessageTimeContainer>
                  <MessageTimeUser>{createdAt}</MessageTimeUser>
                </MessageTimeContainer>
              </MessageBoxUser>
            )
          } else {
            sentFileCounter++;
            return (
              <MessageBoxUser 
                ref={messages.length === index + 1 ? lastMessageRef : null} key={index}
              >
                <SentFileMessages 
                  isLast={sentFileCounter === 1 ? true : false}
                  attachments={message.attachments}
                  text={message.message}
                />
                <MessageTimeContainer>
                  <MessageTimeUser>{createdAt}</MessageTimeUser>
                </MessageTimeContainer>
              </MessageBoxUser>
            )
          }
        } else { 
          if(message.message_type === 'file'){
            return (
              <MessageBoxFriend ref={messages.length === index + 1 ? lastMessageRef : null} key={index}>
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
            <MessageBoxFriend ref={messages.length === index + 1 ? lastMessageRef : null} key={index}>
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