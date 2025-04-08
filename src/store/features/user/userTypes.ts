interface CustomerProfile {
    uid: string,
    email: string,
    name: string,
    address: string,
    coins: number,
    progress: number,
    role: 'customer'
}

interface BusinessPartnerProfile {
    uid: string,
    email: string,
    address: string,
    business_type: 'restaurant' | 'supplier',
    business_name: string,
    business_id: string,
    inventory_count: number,
    role: 'business_partner',
    
}

export interface UserProfile {
    profile: CustomerProfile | BusinessPartnerProfile
}