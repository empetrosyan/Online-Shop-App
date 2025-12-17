'use client';
import { useState } from "react";
import useUser from "../app/hooks/useUser";
import { useTheme } from "@/app/context/ThemeContext";

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
  id: string,
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

export default function SignInForm() {
  const { theme } = useTheme();
  const { addUser } = useUser();
  const [createdUser, setCreatedUser] = useState<User>();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<{ firstname: string, lastname: string }>({ firstname: '', lastname: '' });
  const [phone, setPhone] = useState<string>('');
  const [address, setAdress] = useState<{
    geolocation: {
      lat: string,
      long: string
    },
    city: string,
    street: string,
    number: number,
    zipcode: string
  }>({
    geolocation: {
      lat: '',
      long: ''
    },
    city: '',
    street: '',
    number: 0,
    zipcode: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPsw = password.trim();
    if (!trimmedUsername || !trimmedEmail || !trimmedPsw) return;
    const newUser = await addUser(trimmedUsername, trimmedEmail, trimmedPsw);

    setCreatedUser({
      address: {
        geolocation: {
          lat: address.geolocation.lat,
          long: address.geolocation.long
        },
        city: address.city,
        street: address.street,
        number: address.number,
        zipcode: address.zipcode
      },
      id: '11',
      email: trimmedEmail,
      username: trimmedUsername,
      password: trimmedPsw,
      name: {
        firstname: name.firstname,
        lastname: name.lastname
      },
      phone: phone,
      __v: 0
    })
    clearForm();
  };


  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setAdress({
      geolocation: {
        lat: '',
        long: ''
      },
      city: '',
      street: '',
      number: 0,
      zipcode: ''
    });
    setName({ firstname: '', lastname: '' });
    setPhone('');
  }

  return <div className={`SignIn pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
    <h1 className="font-semibold text-4xl text-center text-cyan-900 pt-6 pb-8">
      Sign In
    </h1>

    <div className="bg-white shadow-lg rounded-2xl w-[90%] md:w-[70%] lg:w-[50%] mx-auto p-10 pl-6 pr-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 mx-auto w-full"
      >

        <p className="text-cyan-900 font-medium pt-2">Personal data</p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Firstname"
            className="flex-1 outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
            value={name.firstname}
            onChange={(e) =>
              setName((prev) => ({
                firstname: e.target.value,
                lastname: prev.lastname,
              }))
            }
          />
          <input
            type="text"
            placeholder="Lastname"
            className="flex-1 outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
            value={name.lastname}
            onChange={(e) =>
              setName((prev) => ({
                firstname: prev.firstname,
                lastname: e.target.value,
              }))
            }
          />
        </div>

        <input
          type="text"
          placeholder="Username"
          className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone"
          className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <p className="text-cyan-900 font-medium pt-2">Address</p>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Latitude"
            className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
            value={address.geolocation.lat}
            onChange={(e) =>
              setAdress((prev) => ({
                ...prev,
                geolocation: {
                  lat: e.target.value,
                  long: prev.geolocation.long,
                },
              }))
            }
          />
          <input
            type="text"
            placeholder="Longitude"
            className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
            value={address.geolocation.long}
            onChange={(e) =>
              setAdress((prev) => ({
                ...prev,
                geolocation: {
                  lat: prev.geolocation.lat,
                  long: e.target.value,
                },
              }))
            }
          />
          <input
            type="text"
            placeholder="City"
            className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition col-span-2"
            value={address.city}
            onChange={(e) =>
              setAdress((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Street"
            className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition col-span-2"
            value={address.street}
            onChange={(e) =>
              setAdress((prev) => ({
                ...prev,
                street: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Number"
            className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
            value={address.number || ''}
            onChange={(e) =>
              setAdress((prev) => ({
                ...prev,
                number: Number(e.target.value),
              }))
            }
          />
          <input
            type="text"
            placeholder="Zipcode"
            className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
            value={address.zipcode}
            onChange={(e) =>
              setAdress((prev) => ({
                ...prev,
                zipcode: e.target.value,
              }))
            }
          />
        </div>

        <p className="text-cyan-900 font-medium pt-2">Password</p>
        <input
          type="password"
          placeholder="Password"
          className="outline-none border border-cyan-700 rounded-xl pl-4 p-2 focus:ring-1 focus:ring-cyan-400 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className={`bg-cyan-700 hover:bg-cyan-800 transition w-[120px] mx-auto text-white rounded-xl p-2 mt-4 shadow-md cursor-pointer ${theme === 'light' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-700 hover:bg-cyan-800'}`}
        >
          Save
        </button>
      </form>
    </div>
  </div>

}