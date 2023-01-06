export interface Theme {
  body: string;
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
  messageFriend: string
}

export const darkTheme: Theme = {
  body: '#000',
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
  messageColor: 'white',
  messageFriend: '#16171b'
}
export const lightTheme: Theme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#fff',
  color: "rgb(64, 63, 63)",
  border: "rgb(207, 205, 202)",
  filter: "invert(0%) sepia(6%) saturate(26%) hue-rotate(224deg) brightness(97%) contrast(107%);",
  iconColor: "#45a3ea",
  formRedirectButtonColor: "rgb(94,14,148)",
  textInput: 'white',
  messageBoxBackground: 'linear-gradient(45deg, rgba(255,226,225,1) 0%, rgba(247,188,186,1) 100%);',
  message: 'linear-gradient(90deg, rgba(18,141,168,1) 0%, rgba(70,163,232,1) 100%);',
  messageColor: '#777777',
  messageFriend: 'white'
}