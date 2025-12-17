'use client';
import { useTheme } from "../context/ThemeContext"

export default function About() {
    const { theme } = useTheme();

    return <div className={`About pt-5 pb-4 ${theme === 'light' ? '' : 'bg-slate-100'}`}>
        <div className={`w-[90%] lg:w-[70%] mx-auto `}>
            <h1 className="font-semibold text-4xl text-center text-cyan-900 pt-6 pb-8">
                About Us
            </h1>

            <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-14 leading-8">
                Welcome to our platform! We are dedicated to building modern, fast and user-friendly
                digital experiences. Our mission is to simplify the way people interact with online
                tools and deliver high-quality solutions with clean design and strong performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Our Mission</h2>
                    <p className="text-gray-700 leading-7">
                        To create reliable, modern and intuitive web systems that help users achieve
                        their goals faster. We focus on usability, accessibility and efficient design.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Our Vision</h2>
                    <p className="text-gray-700 leading-7">
                        A world where technology feels simple. We aim to build a platform where
                        innovation meets practical solutions and exceptional user experience.
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-cyan-900 text-center mb-10">
                Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-cyan-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">Quality</h3>
                    <p className="text-gray-700">High-standard code, design and performance.</p>
                </div>

                <div className="bg-cyan-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">Innovation</h3>
                    <p className="text-gray-700">Always exploring new technologies and solutions.</p>
                </div>

                <div className="bg-cyan-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">Trust</h3>
                    <p className="text-gray-700">We value transparency and reliable service.</p>
                </div>
            </div>
        </div>
    </div>
}
