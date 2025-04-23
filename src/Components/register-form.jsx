"use client"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es requerido"
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida"
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formErrors = validateForm()

        if (Object.keys(formErrors).length === 0) {
            setIsLoading(true)
            // Aquí iría la lógica para enviar los datos al servidor
            console.log("Datos de registro:", formData)

            // Simulando una petición al servidor
            setTimeout(() => {
                setIsLoading(false)
                alert("Registro exitoso!")
                // Resetear el formulario después del registro exitoso
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
            }, 1500)
        } else {
            setErrors(formErrors)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Crear cuenta</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-200">
                        Nombre completo
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${errors.name ? "border-red-500" : "border-gray-600"}`}
                        placeholder="Ingresa tu nombre"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-200">
                        Confirmar contraseña
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${errors.confirmPassword ? "border-red-500" : "border-gray-600"
                            }`}
                        placeholder="Confirma tu contraseña"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 flex justify-center items-center"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            Procesando...
                        </>
                    ) : (
                        "Registrarse"
                    )}
                </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-300">
                ¿Ya tienes una cuenta?{" "}
                <a href="#" className="text-green-400 hover:underline">
                    Iniciar sesión
                </a>
            </p>
        </div>
    )
}
