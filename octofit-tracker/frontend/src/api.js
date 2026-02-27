// Determine the backend API base URL.
// In GitHub Codespaces the frontend runs on port 3000 and the backend on port 8000.
// The hostname for the frontend looks like: <codespace>-3000.app.github.dev
// so we swap the port segment to build the backend URL.
const getBaseUrl = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('-3000.app.github.dev')) {
    return `https://${hostname.replace('-3000.app.github.dev', '-8000.app.github.dev')}`;
  }
  return 'http://localhost:8000';
};

export const API_BASE_URL = getBaseUrl();
