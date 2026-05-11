"use client";

import React, { useState } from "react";
import { useMedications, useDebounce } from "@/hooks";
import { Medication } from "@/services/medication-service";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MedicineTableToolbar } from "./medicine-table-toolbar";
import { MedicineTableContent } from "./medicine-table-content";
import { MedicineTablePagination } from "./medicine-table-pagination";
import { MedicineTableDialogs } from "./medicine-table-dialogs";
import { MedicineDetailModal } from "./medicine-detail-modal";

export function MedicineTable() {
  const { t } = useTranslation(["dashboard", "common"]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    medications,
    total,
    isLoading,
    isError,
    createMedication,
    updateMedication,
    deleteMedication,
  } = useMedications(page, limit, debouncedSearch);

  const [medicineToDelete, setMedicineToDelete] = useState<Medication | null>(
    null,
  );
  const [medicineToEdit, setMedicineToEdit] = useState<Medication | null>(null);
  const [medicineToView, setMedicineToView] = useState<Medication | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const totalPages = Math.ceil(total / limit);

  // Handlers
  const handleDeleteMedicine = async () => {
    if (!medicineToDelete) return;
    try {
      const result = await deleteMedication(medicineToDelete.id);
      if (result.ok) {
        toast.success("Deleted medicine successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting medicine");
    } finally {
      setMedicineToDelete(null);
    }
  };

  const handleConfirmAdd = async (data: Partial<Medication>) => {
    return await createMedication(data);
  };

  const handleConfirmEdit = async (data: Partial<Medication>) => {
    if (!medicineToEdit) return { ok: false };
    return await updateMedication(medicineToEdit.id, data);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-0 transition-all">
      {/* 1. Toolbar: Title & Search */}
      <MedicineTableToolbar
        title={t("dashboard:sidebar.manageMedicines")}
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsAddDialogOpen(true)}
      />

      {/* 2. Table Content */}
      <MedicineTableContent
        medications={medications}
        isLoading={isLoading}
        isError={isError}
        noDataText={t("common:noData")}
        startIndex={(page - 1) * limit}
        onView={setMedicineToView}
        onEdit={setMedicineToEdit}
        onDelete={setMedicineToDelete}
      />

      {/* 3. Pagination */}
      <MedicineTablePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* 4. Action Dialogs */}
      <MedicineTableDialogs
        medicineToDelete={medicineToDelete}
        onCloseDeleteDialog={() => setMedicineToDelete(null)}
        onConfirmDelete={handleDeleteMedicine}
        medicineToEdit={medicineToEdit}
        isAddDialogOpen={isAddDialogOpen}
        onCloseEditDialog={() => setMedicineToEdit(null)}
        onCloseAddDialog={() => setIsAddDialogOpen(false)}
        onConfirmAdd={handleConfirmAdd}
        onConfirmEdit={handleConfirmEdit}
      />

      {/* 5. View Detail Modal */}
      <MedicineDetailModal
        medicine={medicineToView}
        isOpen={!!medicineToView}
        onClose={() => setMedicineToView(null)}
      />
    </div>
  );
}
