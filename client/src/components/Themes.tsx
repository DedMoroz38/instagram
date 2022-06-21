export interface Theme {
  body: string;
  text: string;
  toggleBorder: string;
  background: string;
  color: string;
  border: string,
  filter: string
}

export const darkTheme: Theme = {
  body: '#FFF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#242526',
  color: "white",
  border: "white",
  filter: "invert(100%) sepia(3%) saturate(11%) hue-rotate(46deg) brightness(103%) contrast(100%);"
}
export const lightTheme: Theme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#fff',
  color: "rgb(64, 63, 63)",
  border: "rgb(207, 205, 202)",
  filter: "invert(0%) sepia(6%) saturate(26%) hue-rotate(224deg) brightness(97%) contrast(107%);"
}