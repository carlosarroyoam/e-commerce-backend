module.exports = {
  first_name: ['required', 'alpha', 'min:5', 'max:50'],
  last_name: ['required', 'alpha', 'min:5', 'max:50'],
  email: ['required', 'email', 'max:128'],
  password: ['required', 'min:8', 'max:16'],
  is_super: ['required', 'boolean'],
};
