export const isPhoneNumber = (phone: string) => {
    return /^1[3-9]\d{9}$/.test(phone)
}