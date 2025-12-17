'use client';

import Toast from "@/components/Toast";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
    const { theme } = useTheme();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [toast, setToast] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setToast(true);
        clearForm();
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setMessage('');
    }

    return <div className={`Contact pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        <div className={`w-[90%] lg:w-[70%] mx-auto `}>

            {toast && <Toast message={'Your message sent.'} type={'success'} />}
            <h1 className="font-semibold text-4xl text-center text-cyan-900 pt-6 pb-8">
                Contact Us
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-700 leading-7 mb-6">
                        Have questions? Feel free to contact us anytime — we will get back
                        to you as soon as possible.
                    </p>

                    <div className="text-gray-700">
                        <p><span className="font-semibold text-cyan-900">Email:</span> shopnow@gmail.com</p>
                        <p className=" py-2"><span className="font-semibold text-cyan-900">Phone:</span> +374(33) 33-33-33 </p>
                        <p><span className="font-semibold text-cyan-900">Address:</span> Yerevan, Armenia</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-md space-y-6"
                >
                    <div>
                        <label className="font-medium text-cyan-900">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => { setName(e.target.value); setToast(false) }}
                            className="w-full p-3 mt-1 rounded-lg outline-none border border-cyan-500 focus:ring focus:ring-cyan-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium text-cyan-900">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setToast(false) }}
                            className="w-full p-3 mt-1 rounded-lg outline-none border border-cyan-500 focus:ring focus:ring-cyan-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium text-cyan-900">Message</label>
                        <textarea
                            name="message"
                            value={message}
                            onChange={e => { setMessage(e.target.value); setToast(false) }}
                            rows={5}
                            className="w-full p-3 mt-1 rounded-lg outline-none border border-cyan-500 focus:ring focus:ring-cyan-500 resize-none"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-3 rounded-xl font-semibold transition shadow-md cursor-pointer mt-4 ${theme === 'light' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-700 hover:bg-cyan-800'}`}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
}
