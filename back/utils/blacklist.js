
// Tokens d'authentification (utilisés pour login/logout)
export  const blacklist = new Set();

// Tokens de réinitialisation de mot de passe (reset-password)
export const blacklistReset =  new Map();

export function isBlacklisted(token){
  const now = Date.now();
  const expiry = blacklistReset.get(token);
  if (expiry && expiry < now) {
    blacklistReset.delete(token); 
    return false;
  }   
  return blacklistReset.has(token);
  
}

export function addToBlacklist(token ) {
  const expiration = Date.now() + 15 * 60 * 1000;//15 min
  blacklistReset.set(token, expiration);
}