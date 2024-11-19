import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/app/utils/api';

// Hook to fetch users
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'], // Query key as an array
        queryFn: fetchUsers, // Query function as a property
    });
};