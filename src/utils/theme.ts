export const theme = {
  colors: {
    primary: '#4A148C',
    accent: '#FF6F61',
    background: '#FFF3E0',
    tag: '#A5D6A7',
    form: {
      background: '#F5F5F5',
      border: '#8D6E63'
    },
    button: {
      primary: '#B71C1C',
      gradient: {
        start: '#880E4F',
        end: '#C2185B'
      }
    }
  }
};

export const getCSSVariable = (name: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
};

export const setCSSVariable = (name: string, value: string): void => {
  document.documentElement.style.setProperty(`--${name}`, value);
};

export const getColorValue = (path: string): string => {
  return path.split('.').reduce((obj: any, key: string) => obj[key], theme.colors);
}; 