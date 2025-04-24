"use client"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import bcrypt from 'bcryptjs'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formErrors = validateForm()

        if (Object.keys(formErrors).length === 0) {
            try {
                setIsLoading(true)
                setErrors({})

                const users = JSON.parse(localStorage.getItem('users') || '[]')
                const user = users.find(u => u.email === formData.email)

                if (!user) {
                    setErrors({ email: "Usuario no encontrado" })
                    return
                }

                console.log("Comparando contraseñas:", formData.password, user.password)

                // Se compara la contraseña ingresada con la contraseña almacenada
                // Extrae el salt del hash almacenado
                // Genera un nuevo hash con la contraseña ingresada y la compara con el hash almacenado
                const isPasswordValid = await bcrypt.compare(formData.password, user.password)

                if (isPasswordValid) {
                    alert("¡Inicio de sesión exitoso! La contraseña coincide.")
                    setFormData({
                        email: "",
                        password: "",
                    })
                } else {
                    setErrors({ password: "Contraseña incorrecta" })
                }
            } catch (error) {
                console.error("Error durante el inicio de sesión:", error)
                alert("Hubo un error durante el inicio de sesión. Por favor, intenta nuevamente.")
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(formErrors)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Iniciar sesión</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-200">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${errors.email ? "border-red-500" : "border-gray-600"}`}
                        placeholder="correo@ejemplo.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-200">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${errors.password ? "border-red-500" : "border-gray-600"}`}
                            placeholder="Contraseña"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-300" /> : <Eye className="h-5 w-5 text-gray-300" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex justify-center items-center"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            Iniciando sesión...
                        </>
                    ) : (
                        "Iniciar sesión"
                    )}
                </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-300">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="text-green-400 hover:underline">
                    Regístrate
                </a>
            </p>
        </div>
    )
}
