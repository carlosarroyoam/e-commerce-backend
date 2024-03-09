import userService from '#modules/users/user.service.js';

test('should fetch user by id', async () => {
  const response = await userService.findById(1);

  expect(response).toBe({
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    status: 'active',
  });
});
