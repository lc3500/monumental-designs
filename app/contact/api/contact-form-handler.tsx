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
            let message = 'Failed to send message';
            try {
                const errorData = await response.json();
                if (errorData?.error) message = errorData.error;
            } catch {}
            throw new Error(message);
        }

        return response.json();
    }
}

export default ContactAPI;
