import { mnemonicToAccount, generateMnemonic, english } from 'viem/accounts'

// Generate a BIP39 mnemonic
export function generateMnemonicPhrase() {
  return generateMnemonic(english)
}

// Helper: base64 encode ArrayBuffer
function arrayBufferToBase64(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}
// Helper: base64 decode to Uint8Array
function base64ToUint8Array(base64: string) {
  const binary = atob(base64)
  return Uint8Array.from(binary, c => c.charCodeAt(0))
}
// Helper: hex encode Uint8Array
function toHex(uint8: Uint8Array) {
  return Array.from(uint8).map(b => b.toString(16).padStart(2, '0')).join('')
}
// Helper: hex decode to Uint8Array
function fromHex(hex: string) {
  return Uint8Array.from(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
}

// Cross-platform random bytes
function getRandomBytes(length: number): Uint8Array {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    return globalThis.crypto.getRandomValues(new Uint8Array(length))
  } else {
    // Node.js fallback
    const { randomBytes } = require('crypto')
    return Uint8Array.from(randomBytes(length))
  }
}

// Type for keystore object
export interface Keystore {
  version: number;
  crypto: {
    ciphertext: string;
    iv: string;
    salt: string;
    kdf: 'pbkdf2';
    cipher: 'aes-gcm';
    iterations: number;
    hash: 'SHA-256';
  };
}

// Encrypt mnemonic with PBKDF2 and AES-GCM, output keystore JSON
export async function encryptMnemonicToKeystore(mnemonic: string, passcode: string): Promise<Keystore> {
  const salt = getRandomBytes(16)
  const iv = getRandomBytes(12)
  // Derive key using PBKDF2
  const keyMaterial = await getKeyMaterial(passcode)
  const key = await deriveKey(keyMaterial, salt)
  // Encrypt mnemonic
  const enc = new TextEncoder()
  const encrypted = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(mnemonic)
  )
  return {
    version: 1,
    crypto: {
      ciphertext: arrayBufferToBase64(encrypted),
      iv: toHex(iv),
      salt: toHex(salt),
      kdf: 'pbkdf2',
      cipher: 'aes-gcm',
      iterations: 100000,
      hash: 'SHA-256',
    },
  }
}

// Decrypt keystore JSON to mnemonic
export async function decryptKeystoreToMnemonic(keystore: Keystore, passcode: string) {
  if (!keystore || typeof keystore !== 'object' || !keystore.crypto || typeof keystore.crypto !== 'object') {
    throw new Error('Invalid keystore format: missing crypto property')
  }
  const { ciphertext, iv, salt } = keystore.crypto
  const keyMaterial = await getKeyMaterial(passcode)
  const key = await deriveKey(keyMaterial, fromHex(salt))
  const dec = new TextDecoder()
  const decrypted = await globalThis.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromHex(iv) },
    key,
    base64ToUint8Array(ciphertext)
  )
  return dec.decode(decrypted)
}

// Helper: get key material from passcode
async function getKeyMaterial(passcode: string) {
  const enc = new TextEncoder()
  return await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(passcode),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
}

// Helper: derive key using PBKDF2
async function deriveKey(keyMaterial: CryptoKey, salt: Uint8Array) {
  return await globalThis.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Get address from mnemonic
export function getAddressFromMnemonic(mnemonic: string) {
  return mnemonicToAccount(mnemonic).address
}

// Sign transaction (EIP-1559 example)
export async function signTransaction(mnemonic: string, tx: any) {
  const account = mnemonicToAccount(mnemonic)
  return account.signTransaction(tx)
}