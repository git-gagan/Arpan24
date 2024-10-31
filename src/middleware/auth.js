// src/middleware/auth.js
export async function basicAuth(req) {
    const auth = req.headers.get('authorization');
    
    // Check if Authorization header is missing
    if (!auth) return false;
  
    // Parse the username and password
    const [type, encoded] = auth.split(' ');
    if (type !== 'Basic') return false;
  
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [username, password] = decoded.split(':');
  
    // Replace with your credentials
    const validUser = import.meta.env.DB_USER;
    const validPass = import.meta.env.DB_PASSWORD;
  
    return username === validUser && password === validPass;
  }
  