import Picker from 'emoji-picker-react';
import styled from "styled-components";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { RefObject, useState } from 'react';
import { useThemeContext } from '../../ContextProviders/ThemeContextProvider';

const MainContainer = styled.div`
  position: relative;
  cursor: pointer;
`

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 0;
  bottom: 45px;
`;

interface Emoji {
  messagesInput: RefObject<HTMLInputElement>
}

const Emoji: React.FC<Emoji> = ({
  messagesInput
}) => {
  const {theme} = useThemeContext();
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const pickEmoji = (value) => {
    messagesInput.current!.value += value.emoji
  }
  return (
    <MainContainer>
      <InsertEmoticonIcon onClick={() => setShowPicker(!showPicker)} />
      {
      showPicker &&
      <EmojiPickerContainer>
        <Picker
          lazyLoadEmojis={true}
          onEmojiClick={pickEmoji}
          theme={theme}
        />
      </EmojiPickerContainer>
      }
    </MainContainer>
  )
}

export default Emoji;