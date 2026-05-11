import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medicationService, Medication } from "@/services/medication-service";

export const medicationQueryKeys = {
  all: ["medications"] as const,
  list: (page: number, limit: number, search?: string) =>
    [...medicationQueryKeys.all, "list", { page, limit, search }] as const,
  detail: (id: string) => [...medicationQueryKeys.all, "detail", id] as const,
};

export function useMedications(page = 1, limit = 10, search?: string) {
  const queryClient = useQueryClient();

  // 1. Fetch Medications List
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: medicationQueryKeys.list(page, limit, search),
    queryFn: () => medicationService.getAllMedications(page, limit, search),
    placeholderData: (previousData) => previousData,
  });

  // 2. Create Medication Mutation
  const createMedicationMutation = useMutation({
    mutationFn: (data: Partial<Medication>) =>
      medicationService.createMedication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationQueryKeys.all });
    },
  });

  // 3. Delete Medication Mutation
  const deleteMedicationMutation = useMutation({
    mutationFn: (id: string) => medicationService.deleteMedication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationQueryKeys.all });
    },
  });

  // 4. Update Medication Mutation
  const updateMedicationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Medication> }) =>
      medicationService.updateMedication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationQueryKeys.all });
    },
  });

  return {
    medications: data?.medications || [],
    total: data?.total || 0,
    isLoading,
    isError,
    createMedication: async (data: Partial<Medication>) => {
      const res = await createMedicationMutation.mutateAsync(data);
      return { ok: !!res };
    },
    updateMedication: async (id: string, data: Partial<Medication>) => {
      const res = await updateMedicationMutation.mutateAsync({ id, data });
      return { ok: !!res };
    },
    deleteMedication: async (id: string) => {
      await deleteMedicationMutation.mutateAsync(id);
      return { ok: true };
    },
    refetch,
  };
}
