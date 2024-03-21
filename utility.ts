export async function generateRandomEmail() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const domain = '@ttexternship.com'; 
  let string = '';

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    string += characters.charAt(randomIndex);
  }
  return `qa-${string}${domain}`;
}
