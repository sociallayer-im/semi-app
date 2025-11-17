export const isPhoneNumber = (phone: string) => {
  return /^1[3-9]\d{9}$/.test(phone);
};

export const isPrivateKey = (privateKey: string) => {
  return /^0x[0-9a-fA-F]{64}$/.test(privateKey);
};
