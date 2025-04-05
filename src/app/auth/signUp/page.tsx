"use client"
import React, { useState } from "react"
import Link from "next/link"
import GenericForm from "@/components/genericForm"

interface UserData {
    name: string,
    email: string,
    password: string,
    businessName?: string,
    businessId?: string,
    role:string,
}

export default function SignUp() {
    const [formData, setFormData] = useState<UserData>({
        name: '',
        email: '',
        password: '',
        role: '',
        // Fields specific to business partners
        businessName: '',
        businessId: '',
    });

    const [userType, setUserType] = useState<string  | null>(null)
    const handleSubmit = () => {
        console.log("submitted!")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return <>
        <GenericForm onSubmit={handleSubmit}>
            <h1>Sign Up{userType === null && " As"}</h1>
            {userType !== null && 
                <p className="pb-6">Changed your mind? Sign up as <span onClick={() => setUserType(userType === "customer" ? "businessPartner" : "customer")} className="highlight cursor-pointer underline">{userType === "customer" ? "Business Partner" : "Customer"}</span> instead</p>
            }

            {userType === null && 
                <div className="m-auto">
                    <div className="flex gap-5 justify-center items-center">
                        <button className="btn" onClick={() => setUserType("customer")}>Customer</button>
                        <span className="font-bold">or</span>
                        <button className="btn" onClick={() => setUserType("businessPartner")}>Business Partner</button>
                    </div>
                </div>
            }

            {userType !== null &&
                <div>
                    <div className="field-wrap">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="JohnDoe@mail.com"
                            required
                        />
                    </div>
                    {userType === "businessPartner" && 
                        <>
                            <div className="field-wrap">
                                <label htmlFor="">Business Type</label>
                                <select name="role" 
                                    id="role"
                                    value={formData.role} 
                                    onChange={handleChange}
                                >
                                    <option value="">Select a role</option>
                                    <option value="restaurantOwner">Restaurant Owner</option>
                                    <option value="freshSupplier">Fresh Supplier</option>
                                </select>
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
                        </>
                    }
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
                    <p className="pt-1">Already have an account? <Link href="/auth/login" className="underline">Log In</Link></p>
                </div>
            }
        </GenericForm>
    </>
}