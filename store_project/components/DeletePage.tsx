'use client';

import { FormEvent, useEffect, useState } from "react";
import useUser from "../app/hooks/useUser";

type Props = {
    user: User,
    handleLogout: () => void;
};

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
};

export default function DeletePage({ user, handleLogout }: Props) {
    const { deleteUser } = useUser();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameMatch, setUsernameMatch] = useState(true);
    const [pswMatch, setPswMatch] = useState(true);

    useEffect(() => {
        setUsernameMatch(true);
        setPswMatch(true);
    }, [username, password])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedUsername = username.trim();
        const trimmedPsw = password.trim();
        if (trimmedUsername !== user.username) {
            setUsernameMatch(false);
            return;
        } else if (trimmedPsw !== user.password) {
            setPswMatch(false);
            return;
        }
        await deleteUser(user.id);
        handleLogout();
    }



    return <div className="DeletePage">
        <h1 className="font-semibold text-4xl text-center text-cyan-700 pt-6 pb-8">
            Delete Profile
        </h1>
        <div className="bg-white shadow-lg rounded-2xl mx-auto p-10 pl-6 pr-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-auto w-[70%]">
                <div> <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition w-full" />
                    {!usernameMatch && <p className=" text-red-500 text-xs pl-3 pt-1">Username is not match. Try again.</p>}</div>
                <div><input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition w-full" />
                    {!pswMatch && <p className=" text-red-500 text-xs pl-3 pt-1">Password is not match. Try again.</p>}</div>
                <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-800 transition w-[120px] mx-auto text-white rounded-xl p-2 mt-4 shadow-md cursor-pointer"
                >Delete</button>
            </form>
        </div>
    </div>
}