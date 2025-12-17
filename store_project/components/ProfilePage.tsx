'use client';
import useUser from "@/app/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import EditPage from "./EditPage";
import DeletePage from "./DeletePage";
import { useTheme } from "@/app/context/ThemeContext";


type Props = {
    id: number;
    handleLogout: () => void;
};

type Pages = {
    'mainPage': boolean,
    'addressPage': boolean,
    'editPage': boolean,
    'deletePage': boolean
}

export default function ProfilePage({ id, handleLogout }: Props) {
    const { theme } = useTheme();
    const { user, getUser, updateUser } = useUser();
    const [pages, setPages] = useState<Pages>({
        'mainPage': true,
        'addressPage': false,
        'editPage': false,
        'deletePage': false
    });
    const [showMenu, setShowMenu] = useState(false);
    const refMenu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getUserById = async () => {
            await getUser(id);
        }

        getUserById();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (refMenu.current && !refMenu.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => { document.removeEventListener('mousedown', handleClickOutside) }
    })


    const selectPage = (pageName: keyof Pages) => {
        setPages(prev => {
            const updated = {} as Pages;
            for (const key in prev) {
                const typedKey = key as keyof Pages;
                updated[typedKey] = typedKey === pageName;
            }
            return updated;
        });
        setShowMenu(false);
    };


    return <div className={`ProfilePage flex min-h-[600px] ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        <div className="LeftSide pt-5 pb-4 hidden w-[30%] lg:w-[25%] xl:w-[20%] sm:flex flex-col justify-between bg-cyan-50 p-4 text-nowrap">
            <ul className=" text-cyan-800 text-lg">
                <li
                    className=" p-1 px-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                    style={pages.mainPage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                    onClick={() => selectPage('mainPage')}
                >Main</li>
                <li
                    className=" p-1 px-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                    style={pages.addressPage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                    onClick={() => selectPage('addressPage')}
                >Address</li>
                <li
                    className=" p-1 px-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                    style={pages.editPage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                    onClick={() => selectPage('editPage')}
                >Edit account</li>
                <li
                    className=" p-1 px-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                    style={pages.deletePage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                    onClick={() => selectPage('deletePage')}
                >Delete account</li>
            </ul>
            <button onClick={handleLogout} className=" cursor-pointer font-bold text-red-600 hover:text-red-700 pl-3 transition w-20"
            >Log out</button>
        </div>
        <div ref={refMenu} className="LeftSide pt-5 sm:hidden flex relative">
            <button onClick={() => setShowMenu(!showMenu)} className=" flex flex-col gap-1 pl-2 cursor-pointer">
                <span className=" w-6 h-0.5 bg-cyan-500 shadow"></span>
                <span className=" w-6 h-0.5 bg-cyan-500 shadow"></span>
                <span className=" w-6 h-0.5 bg-cyan-500 shadow"></span>
            </button>
            {showMenu && <div className="flex flex-col justify-between bg-cyan-50 absolute top-10 left-3 px-2 py-2 rounded-xl shadow-xl transform">
                <ul className=" text-cyan-800 text-nowrap pb-2">
                    <li
                        className=" p-1 pl-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                        style={pages.mainPage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                        onClick={() => selectPage('mainPage')}
                    >Main</li>
                    <li
                        className=" p-1 pl-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                        style={pages.addressPage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                        onClick={() => selectPage('addressPage')}
                    >Address</li>
                    <li
                        className=" p-1 pl-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                        style={pages.editPage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                        onClick={() => selectPage('editPage')}
                    >Edit account</li>
                    <li
                        className=" p-1 pl-3 mt-2 mb-1 hover:bg-cyan-100 rounded-md cursor-pointer"
                        style={pages.deletePage ? { backgroundColor: "#cefafe", fontWeight: "bold" } : {}}
                        onClick={() => selectPage('deletePage')}
                    >Delete account</li>
                </ul>
                <button onClick={handleLogout} className=" cursor-pointer font-bold text-red-600 hover:text-red-700 transition"
                >Log out</button>
            </div>}
        </div>
        <div className={`RightSide mx-auto w-full flex flex-col items-center justify-center gap-10 p-8 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
            {pages.mainPage && <div className="MainPage bg-white shadow-lg rounded-2xl mx-auto p-10 px-6">
                <div className="flex flex-col items-center gap-3">
                    <img
                        src="/default-avatar.png"
                        alt="avatar"
                        className="w-32 h-32 rounded-full border-4 border-cyan-200 shadow-md object-cover"
                    />
                    <p className=" text-center font-extrabold text-3xl text-cyan-700 capitalize">
                        {user?.name.firstname} {user?.name.lastname}
                    </p>
                    <p className="text-gray-500">@{user?.username}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="bg-cyan-50 rounded-xl shadow-sm p-5 text-center hover:shadow-md transition xl:w-80">
                        <h2 className="text-cyan-700 text-xl font-semibold mb-3">Personal Info</h2>
                        <p><span className="font-medium">Firstname:</span> {user?.name.firstname}</p>
                        <p><span className="font-medium">Lastname:</span> {user?.name.lastname}</p>
                        <p><span className="font-medium">ID:</span> {user?.id}</p>
                    </div>

                    <div className="bg-cyan-50 rounded-xl shadow-sm p-5 text-center hover:shadow-md transition">
                        <h2 className="text-cyan-700 text-xl font-semibold mb-3">Contact</h2>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Phone:</span> {user?.phone}</p>
                    </div>
                </div>
            </div>}
            {pages.addressPage && <div className="AddressPage sm:w-[80%]">
                <h2 className="font-semibold text-4xl text-center text-cyan-700 pt-6 pb-8">Address</h2>
                <div className="bg-white shadow-lg rounded-2xl mx-auto p-10 px-6 text-center">
                    <p>{user?.address.number}, {user?.address.street}</p>
                    <p>{user?.address.city}, {user?.address.zipcode}</p>
                    <iframe
                        src={`https://www.google.com/maps?q=${user?.address.geolocation.lat},${user?.address.geolocation.long}&z=12&output=embed`}
                        className="w-full h-60 rounded-lg mt-5 border-0"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>}
            {pages.editPage && user && <div className="EditPage sm:w-[80%] w-full"> <EditPage user={user} updateUser={updateUser} /> </div>}
            {pages.deletePage && user && <div className="DeletePage sm:w-[80%] w-full"> <DeletePage user={user} handleLogout={handleLogout} /> </div>}
        </div>

    </div>
}