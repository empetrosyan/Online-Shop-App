'use client';

import { FormEvent, useState } from "react";
import Toast from "./Toast";
import { useTheme } from "@/app/context/ThemeContext";

type Props = {
    user: User,
    updateUser: (id: number, username: string, email: string, password: string) => Promise<void>;
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

export default function EditPage({ user, updateUser }: Props) {
    const { theme } = useTheme();
    const [username, setUsername] = useState<string>(user.username);
    const [email, setEmail] = useState<string>(user.email);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);


    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleChangeData = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        if (!trimmedUsername || !trimmedEmail) return;
        await updateUser(user.id, trimmedUsername, trimmedEmail, user.password);
        showToast("Your personal data changed successfully.", "success");
    }

    const handleChangePws = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedOldPsw = oldPassword.trim();
        const trimmedNewPsw = newPassword.trim();
        if (!trimmedOldPsw || !trimmedNewPsw) {
            showToast("You have to fill all fields.", "error");
            return;
        }
        if (trimmedOldPsw !== user.password) {
            showToast("Wrong password.", "error");
            return;
        };
        await updateUser(user.id, user.username, user.email, trimmedNewPsw);
        showToast("Password changed successfully.", "success");
        clearForm();
    }

    const clearForm = () => {
        setOldPassword('');
        setNewPassword('');
    }

    return <div className="EditPage">
        <h1 className="font-semibold text-4xl text-center text-cyan-700 pt-6 pb-8">
            Edit Profile
        </h1>
        {toast && <Toast message={toast.message} type={toast.type} />}

        <div className="bg-white shadow-lg rounded-2xl mx-auto p-10 px-6">
            <form onSubmit={handleChangeData} className="flex flex-col gap-5 mx-auto w-[70%]">
                <p>Change personal data</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition" />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition" />
                <button
                    type="submit"
                    className={`transition w-[120px] mx-auto text-white rounded-xl p-2 mt-4 shadow-md cursor-pointer ${theme === 'light' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-700 hover:bg-cyan-800'}`}
                > Save</button>
            </form>
            <form onSubmit={handleChangePws} className="flex flex-col gap-5 mx-auto w-[70%] pt-7">
                <p>Change password</p>
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition" />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition" />
                <button
                    type="submit"
                    className={`transition w-[120px] mx-auto text-white rounded-xl p-2 mt-4 shadow-md cursor-pointer ${theme === 'light' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-700 hover:bg-cyan-800'}`}
                > Save</button>
            </form>
        </div>
    </div >
}