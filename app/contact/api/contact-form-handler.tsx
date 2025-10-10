class ContactAPI {
    static async sendContactForm(data: { name: string; email: string; phone: string; message: string }) {
        const response = await fetch('/contact/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send contact form');
        }

        return response.json();
    }
}

export default ContactAPI;