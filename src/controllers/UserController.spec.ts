import { UserController } from "./UserController";
import { User, UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve causar erro ao novo usuário sem name', () => {
        const mockRequest = {
            body: {
                name: undefined,
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Deve retornar todos os usuários', () => {
        const mockResponse = makeMockResponse<User[]>()
        const mockRequest = {} as Request

        (mockUserService.getAllUsers as jest.Mock).mockReturnValue([
            { name: 'Joana', email: 'joana@dio.com' },
            { name: 'Nath', email: 'nath@test.com' },
        ])

        userController.getAllUsers(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toEqual([
            { name: 'Joana', email: 'joana@dio.com' },
            { name: 'Nath', email: 'nath@test.com' },
        ])
    })
})
