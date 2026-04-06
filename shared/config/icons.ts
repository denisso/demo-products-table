const icons = [
  'close',
  'eye-off',
  'eye',
  'login',
  'logo',
  'password',
  'search',
] as const;

type Dict = Record<(typeof icons)[number], string>;
export const ICONS_CONFIG = icons.reduce<Dict>((a, icon) => {
  a[icon] = `/icons/${icon}.svg`;
  return a;
}, {} as Dict);
