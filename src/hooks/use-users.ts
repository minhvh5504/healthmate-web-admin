import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userProfileService } from "@/services/user-service";

export type UserStatus = "active" | "inactive" | "blocked";
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export const userQueryKeys = {
  all: ["users"] as const,
  list: (page: number, limit: number, status: string) =>
    [...userQueryKeys.all, "list", { page, limit, status }] as const,
  detail: (id: string) => [...userQueryKeys.all, "detail", id] as const,
};

export function useUsers(page = 1, limit = 10, status = "all") {
  const queryClient = useQueryClient();

  // 1. Fetch Users List
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: userQueryKeys.list(page, limit, status),
    queryFn: async () => {
        const res = await userProfileService.getAllUsers(page, limit, status);
        // Map backend structure to frontend interface
        const usersArray = Array.isArray(res?.users) ? res.users : [];
        return {
            ...res,
            users: usersArray.map((u: any) => ({
                id: u.id,
                email: u.email,
                fullName: u.profile?.fullName || "N/A",
                avatarUrl: u.avatarUrl,
                role: u.role || "user",
                isActive: u.isActive ?? true,
                createdAt: u.createdAt || "",
            }))
        };
    },
    placeholderData: (previousData) => previousData,
  });

  // 2. Toggle Status Mutation
  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => userProfileService.toggleUserStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });

  // 3. Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userProfileService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });

  return {
    users: data?.users || [],
    total: data?.total || 0,
    isLoading,
    isError,
    toggleUserStatus: async (id: string) => {
        const res = await toggleStatusMutation.mutateAsync(id);
        return { ok: !!res };
    },
    deleteUser: async (id: string) => {
        const res = await deleteUserMutation.mutateAsync(id);
        return { ok: !!res };
    },
    refetch,
  };
}

