"use client"

import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function AuthExample() {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                    <div className="flex border-b border-gray-700 mb-6">
                        <button
                            className={`py-2 px-4 w-1/2 text-center ${showLogin ? "border-b-2 border-green-500 text-green-400 font-medium" : "text-gray-400"
                                }`}
                            onClick={() => setShowLogin(true)}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            className={`py-2 px-4 w-1/2 text-center ${!showLogin ? "border-b-2 border-green-500 text-green-400 font-medium" : "text-gray-400"
                                }`}
                            onClick={() => setShowLogin(false)}
                        >
                            Registrarse
                        </button>
                    </div>

                    {showLogin ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    )
}
