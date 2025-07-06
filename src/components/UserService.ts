export async function getUserByEmail(email: string) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${process.env.REACT_APP_USER_URI}/api/users/email/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('User not found');
  return res.json();
}
