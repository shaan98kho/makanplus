"use client"
import React, { useState } from "react"
import Link from "next/link"
import GenericForm from "@/components/genericForm"

interface UserData {
    name: string,
    email: string,
    password: string,
    businessName?: string,
    businessId?: string
}

interface LoginFormProps {
    userData: UserData
}

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [formData, setFormData] = useState<UserData>({
        name: '',
        email: '',
        password: '',
        // Fields specific to business partners
        businessName: '',
        businessId: '',
      });

    const handleSubmit = () => {
        console.log("submitted!")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return <>
        <GenericForm onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="field-wrap">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="field-wrap">
                <label htmlFor="businessName">Business Name</label>
                <input 
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    required
                />
            </div>
            <div className="field-wrap">
                <label htmlFor="businessId">Business ID</label>
                <input 
                    type="text"
                    id="businessId"
                    name="businessId"
                    value={formData.businessId}
                    onChange={handleChange}
                    placeholder="Enter your business ID"
                    required
                />
            </div>
            <div className="field-wrap">
                <label htmlFor="password">Password</label>
                <input 
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <div className="field-wrap">
                <label htmlFor="confirmPassword">Confirm your password</label>
                <input 
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Retype your password"
                    required
                />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn mt-9 w-full">Sign Up</button>
            <p className="pt-2">Already have an account? <Link href="/login">Log In</Link></p>
        </GenericForm>
    </>
}