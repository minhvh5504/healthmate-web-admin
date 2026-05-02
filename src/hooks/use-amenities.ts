import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { amenityService } from '@/services/amenity-service';

export const useAmenities = () => {
    return useQuery({
        queryKey: ['amenities'],
        queryFn: () => amenityService.getAll(),
    });
};

export const useCreateAmenity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { name: string; icon?: string }) => amenityService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amenities'] });
        },
    });
};

export const useDeleteAmenity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => amenityService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amenities'] });
        },
    });
};
