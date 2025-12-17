import { useEffect, useState } from "react"

type User = {
    address: {
        geolocation: {
            lat: string,
            long: string
        },
        city: string,
        street: string,
        number: number,
        zipcode: string
    },
    id: number,
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    phone: string,
    __v: number
}

type UpdatedUser = {
    id: number,
    username: string,
    email: string,
    password: string
}


export default function useUser() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>();
    const [newUser, setNewUser] = useState<User>();
    const [updatedUser, setUpdatedUser] = useState<UpdatedUser>();

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/users', { next: { revalidate: 60 } });
            if (!res.ok) throw new Error('Failed to fetch users.');

            const data: User[] = await res.json();
            setUsers(data);
        } catch (e) {
            console.error('Error fetching users.', e);
        } finally {
            setLoading(false);
        }
    }

    const getUser = async (id: number) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/users/${id}`, { next: { revalidate: 60 } });
            if (!res.ok) throw new Error(`Failed to fetch user with id ${id}.`);

            const data: User = await res.json();
            setUser(data);
        } catch (e) {
            console.error(`Error fetching user with id ${id}.`, e);
        }
    }

    const addUser = async (username: string, email: string, password: string) => {
        try {
            const res = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            if (!res.ok) throw new Error('Failed to sign in.');
            const data = await res.json() as User;
            setNewUser(data);
            setUsers(prev => [data, ...prev]);
            return newUser;

        } catch (e) {
            console.error('Error sign in.', e);
            return;
        }
    }

    const deleteUser = async (id: number) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/users/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error(`Failed to delete user with ID ${id}`);
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (e) {
            console.error(`Error to delete user with ID ${id}`, e);
        }
    }

    const updateUser = async (id: number, username: string, email: string, password: string) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/users/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    username,
                    email,
                    password
                })
            });

            if (!res.ok) throw new Error(`Failed to update user wuth ID ${id}`);
            const data = await res.json() as UpdatedUser;
            setUpdatedUser(data);
            setUser(prev => prev ? { ...prev, ...data } : prev);
            setUsers(prev => prev.map(user => user.id === id ? { ...user, ...data } : user));
        } catch (e) {
            console.error(`Error to update user with ID ${id}`, e);
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if (!res.ok) throw new Error('Failed to login.');
            const data = await res.json();
            await getAllUsers();
            const logedinUser = (users.filter(user => user.password === password))[0];
            localStorage.setItem("authData", JSON.stringify({
                token: data.token,
                id: logedinUser.id,
            }));

            return data.token;

        } catch (e) {
            console.error('Error login.', e);
            return;
        }
    }


    return {
        loading,
        users,
        getAllUsers,
        user,
        getUser,
        newUser,
        addUser,
        deleteUser,
        updateUser,
        login,
    }
}