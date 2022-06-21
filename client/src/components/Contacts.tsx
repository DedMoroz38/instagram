import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  list-style-type: none;
  margin-right: 5px;
  width: 30vw;
  box-sizing: border-box;
`
const ContactBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 2px 10px;
  margin-bottom: 10px;
  height: 56px;
  &:hover {
    background: grey;
  }
`
const ContactValue = styled.div`
  color: ${({ theme }) => theme.color}
`


const contacts = ["Egor", "Egor","Egor","Egor","Egor","Egor","Egor", "Egor","Egor","Egor","Egor","Egor","Egor","Egor", "Egor", "Egor","Egor","Egor","Egor","Egor","Egor","Egor","Egor","Egor","Egor","Egor","Egor","Egor"];

export const Contacts: React.FC = () => {
  return (
    <MainContainer>
      {contacts.map(contact => (
        <ContactBox>
          <ContactValue>{contact}</ContactValue>
        </ContactBox>
      ))}
    </MainContainer>
  )
}
export default Contacts;
