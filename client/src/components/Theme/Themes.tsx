export interface Theme {
  input: {
    background: string
  },
  text: string;
  toggleBorder: string;
  background: string;
  color: string;
  border: string,
  filter: string,
  iconColor: string,
  formRedirectButtonColor: string,
  textInput: string,
  messageBoxBackground: string,
  message: string,
  messageColor: string,
  messageFriend: string,
  shadow: string
}

export const darkTheme: Theme = {
  main: {
    background: '#20232b'
  },
  header: {
    linkColor: 'white'
  },
  input: {
    background: '#16171b',
    placeholderColor: '#999'
  },
  identityIcon: 'white',
  contact: {
    hoverBackground: 'background: #1a1e23'
  },
  conversations: {
    topBar: {
      background: 'black',
      color: 'white'
    }
  },
  profile: {
    hr: 'white'
  },
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#20232b',
  color: "white",
  border: "white",
  filter: "invert(100%) sepia(3%) saturate(11%) hue-rotate(46deg) brightness(103%) contrast(100%);",
  iconColor: "white",
  formRedirectButtonColor: "white",
  textInput: '#16171b',
  messageBoxBackground: '#1d1e24',
  message: '#b785f5',
  fileSize: '#96989d',
  messageColor: 'white',
  messageFriend: '#16171b',
  shadow: '#ba8fff'
}
export const lightTheme: Theme = {
  main: {
    background: '#fff'
  },
  header: {
    linkColor: 'black'
  },
  input: {
    background: '#F3EEFD',
    placeholderColor: '#DCDCDC'
  },
  identityIcon: 'rgb(207, 205, 202)',
  contact: {
    hoverBackground: 'box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;'
  },
  conversations: {
    topBar: {
      background: '#F3EEFD',
      color: 'rgb(64,63,63)'
    }
  },
  profile: {
    hr: 'black'
  },
  // body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#fff',
  color: "rgb(64, 63, 63)",
  border: "rgb(207, 205, 202)",
  filter: "invert(0%) sepia(6%) saturate(26%) hue-rotate(224deg) brightness(97%) contrast(107%);",
  iconColor: "#45a3ea",
  formRedirectButtonColor: "rgb(69, 163, 234)",
  textInput: 'white',
  messageBoxBackground: '#EEF8FD',
  message: 'linear-gradient(90deg, rgba(18,141,168,1) 0%, rgba(70,163,232,1) 100%);',
  fileSize: 'white',
  messageColor: '#777777',
  messageFriend: 'white',
  shadow: 'rgb(69, 163, 234)'
}