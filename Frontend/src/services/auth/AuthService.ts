import APIConfig from "../../config/APIConfig.ts";
import axios, { AxiosInstance } from "axios";

export default class AuthService {
  private client: AxiosInstance;
  private apiPROTOCOL = import.meta.env.VITE_PROTOCOL;
  private apiHOST = import.meta.env.VITE_HOST;
  private API_url = `${this.apiPROTOCOL}://${this.apiHOST}`

  constructor() {
    this.client = axios.create({
      baseURL: APIConfig.baseURL(),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async login(username: string, password: string) {
    return await this.client.post("/signin", {
      username,
      password,
    });
  }

  // TODO: Implement Backend Logic to Make This Endpoint Functional
  async logout() {
    return this.client.post("/logout");
  }

  async register(
    username: string,
    password: string,
    name: string,
  ) {
    return this.client.post("/signup", {
      username,
      password,
      name
    });
  }

  async getUser(token: string|null): Promise<void> {
    try {
        const response = await fetch(`${this.API_url}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Data:', data)
        return data.name
    } catch (error) {
        console.error('Error:', error)
    }
}

async createTodo(token: string|null, name: string): Promise<void> {
    try {
        const response = await fetch(`${this.API_url}/api/item`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                title: name
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Data:', data)
        return data.name
    } catch (error) {
        console.error('Error:', error)
    }
}

async removeTodo(token: string|null, id: string): Promise<void> {
    try {
        const response = await fetch(`${this.API_url}/api/item`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                id: id
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Data:', data)
        return
    } catch (error) {
        console.error('Error:', error)
    }
}

async markTodo(token: string|null, id: string, completed: boolean): Promise<void> {
    try {
        const response = await fetch(`${this.API_url}/api/item/completed`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                id: id,
                completed: !completed
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
    } catch (error) {
        console.error('Error:', error)
    }
}

async fetchWithToken(token: string|null): Promise<void> {
    try {
        const response = await fetch(`${this.API_url}/api/user/todolist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Data:', data)
        return data
    } catch (error) {
        console.error('Error:', error)
    }
}


}