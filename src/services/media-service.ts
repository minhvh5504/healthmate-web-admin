import { apiClient } from '@/lib/api-client';

export const mediaService = {
    upload: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        // Assuming the endpoint is /upload or /media/upload based on common practices
        // If the backend has a specific MediaController with 'upload' endpoint
        const response = await apiClient<{ url: string } | string>('media/upload', {
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (typeof response === 'string') {
            return response;
        }
        return response.url;
    },
};
