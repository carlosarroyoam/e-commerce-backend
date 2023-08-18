import userService from '#app/modules/users/user.service.js';
import UserRepository from '#modules/users/user.repository.js';

jest.mock('#modules/users/user.repository', () => {
	return jest.fn().mockImplementation(() => {
		return {
			findById: () => {
				return {
					id: 1,
					name: 'John Doe',
					email: 'johndoe@example.com',
					status: 'active',
				};
			},
		};
	});
});

test('should fetch user by id', async () => {
	// Call the findById method with a valid user_id
	await userService.findById(1);

	expect(UserRepository).toHaveBeenCalledTimes(1);
});
