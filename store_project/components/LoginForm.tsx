'use client';
import { FormEvent, useState, useEffect } from "react";
import useUser from "../app/hooks/useUser";
import SignInForm from "./SignInForm";
import { useTheme } from "@/app/context/ThemeContext";

type Props = {
    handleLoginMode: () => void;
}

export default function LoginForm({ handleLoginMode }: Props) {
    const { theme } = useTheme();
    const { login, users } = useUser();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSignedIn, setIsSighnIn] = useState(true);
    const [usernameMatch, setUsernameMatch] = useState(true);
    const [pswMatch, setPswMatch] = useState(true);


    useEffect(() => {
        setUsernameMatch(true);
        setPswMatch(true);
    }, [username, password]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedPsw = password.trim();
        if (!trimmedUsername || !trimmedPsw) return;

        const foundUser = users.find(user => user.username === trimmedUsername);

        if (!foundUser) {
            setUsernameMatch(false);
            return;
        } else if (foundUser && foundUser.password !== trimmedPsw) {
            setPswMatch(false);
            return;
        }

        await login(trimmedUsername, trimmedPsw);
        handleLoginMode();
        clearForm();
    };


    const clearForm = () => {
        setUsername('');
        setPassword('');
    }

    return <div> {isSignedIn ? <div className={`LoginForm pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        <h1 className="font-semibold text-4xl text-center text-cyan-900 pt-6 pb-8">
            Login
        </h1>
        <div className="bg-white shadow-lg rounded-2xl w-[90%] md:w-[70%] lg:w-[50%] mx-auto p-10 pl-6 pr-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-auto w-[70%]">
                <div> <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition w-full" />
                    {!usernameMatch && <p className=" text-red-500 text-xs pl-3 pt-1">User not found. Try again.</p>}</div>
                <div><input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition w-full" />
                    {!pswMatch && <p className=" text-red-500 text-xs pl-3 pt-1">Password is not match. Try again.</p>}</div>
                <button
                    type="submit"
                    className={`transition w-[120px] mx-auto text-white rounded-xl p-2 mt-4 shadow-md cursor-pointer ${theme === 'light' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-700 hover:bg-cyan-800'}`}
                >Login</button>
            </form>
        </div>
        <p className=" text-center p-6"> Do you not have an account? <span
            className=" text-cyan-600 cursor-pointer text-center italic"
            onClick={() => setIsSighnIn(false)}
        >Sign In now.</span> </p>
    </div> : <div>
        <SignInForm />
        <p className={` text-center p-6 ${theme === 'light' ? '' : 'bg-slate-100'}`}>Do you have an account? <span
            className=" text-cyan-600 cursor-pointer text-center italic"
            onClick={() => setIsSighnIn(true)}
        >Login now.</span> </p>
    </div>} </div>
}