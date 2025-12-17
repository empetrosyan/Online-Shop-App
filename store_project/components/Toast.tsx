export default function Toast({ message, type }: { message: string, type: "success" | "error" }) {
    return <div
        className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-lg bg-white textlg
                animate-fadeInOut z-50
                ${type === "success" ? "text-cyan-600" : "text-red-600"} `} >
        {message}
    </div>
}