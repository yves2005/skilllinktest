export const NotificationService = {
    sendEmail: async ({ to, subject, body }) => {
        try {
            const response = await fetch('/api/notify/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ to, subject, body })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to send email notification');
            }
            return data;
        } catch (error) {
            console.error('Error sending email notification:', error);
            // Optionally, we could still fall back to silent failure in dev
        }
    }
};
