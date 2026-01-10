export const sendEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
    const response = await fetch(import.meta.env.VITE_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error sending email: ${response.statusText}`);
    }
    return await response.json();
}