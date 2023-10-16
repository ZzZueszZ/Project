module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
    API_URL: true,
    API_SECRET_KEY: true,
  },
};
