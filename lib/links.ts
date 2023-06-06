const home = () => `/`;
const about = () => `/about`;
const contact = () => `/contact`;
const login = () => `/login`;
const logout = () => `/logout`;
const poll = (slug: string) => `/p/${slug}`;
const draft = () => `/draft`;
const settings = () => `/settings`;
const tag = (slug: string) => `/tags/${slug}`;

const links = {
  home,
  about,
  contact,
  login,
  logout,
  poll,
  draft,
  settings,
  tag,
};

export default links;
