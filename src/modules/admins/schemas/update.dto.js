module.exports = {
  first_name: ['required', 'min:5'],
  last_name: ['required', 'min:5'],
  email: ['required', 'email'],
  password: ['required', 'min:8'],
  is_super: ['required', 'boolean'],
};
