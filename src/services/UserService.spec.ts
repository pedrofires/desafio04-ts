import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve retornar todos os usuários', () => {
        const users = userService.getAllUsers();
        expect(users).toEqual(mockDb)
    })

    it('Deve apagar um usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.deleteUser('joana@dio.com');
        expect(mockConsole).toHaveBeenCalledWith('User deletado, DB:', mockDb)
    })
})
