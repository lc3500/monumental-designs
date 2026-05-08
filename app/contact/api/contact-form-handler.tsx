class ContactAPI {
    static async sendContactForm(data: { name: string; email: string; phone: string; message: string }) {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const response = await fetch(`${baseUrl}/api/monumental-contact/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send contact form');
        }

        return response.json();
    }
}

export default ContactAPI;
