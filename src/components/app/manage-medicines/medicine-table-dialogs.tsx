"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Medication } from "@/services/medication-service";
import { MedicineDialog } from "./medicine-dialog";

interface MedicineTableDialogsProps {
  medicineToDelete: Medication | null;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  medicineToEdit: Medication | null;
  isAddDialogOpen: boolean;
  onCloseEditDialog: () => void;
  onCloseAddDialog: () => void;
  onConfirmAdd: (data: Partial<Medication>) => Promise<{ ok: boolean }>;
  onConfirmEdit: (data: Partial<Medication>) => Promise<{ ok: boolean }>;
}

export function MedicineTableDialogs({
  medicineToDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  medicineToEdit,
  isAddDialogOpen,
  onCloseEditDialog,
  onCloseAddDialog,
  onConfirmAdd,
  onConfirmEdit,
}: MedicineTableDialogsProps) {
  return (
    <>
      {/* Delete Dialog */}
      <AlertDialog
        open={!!medicineToDelete}
        onOpenChange={(open) => !open && onCloseDeleteDialog()}
      >
        <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-slate-800">
              Confirm Delete Medicine
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This action <b>cannot be undone</b>. Are you sure you want to
              permanently delete <b>{medicineToDelete?.name}</b> from the
              system?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 pt-4">
            <AlertDialogCancel className="rounded-xl border-slate-100 text-slate-500 font-bold hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="rounded-xl font-bold text-white shadow-lg transition-all bg-red-600 hover:bg-red-700 shadow-red-100"
            >
              Permanently Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add/Edit Dialog */}
      <MedicineDialog
        open={isAddDialogOpen || !!medicineToEdit}
        onOpenChange={(open) => {
          if (!open) {
            onCloseAddDialog();
            onCloseEditDialog();
          }
        }}
        medicine={medicineToEdit}
        onSubmit={medicineToEdit ? onConfirmEdit : onConfirmAdd}
      />
    </>
  );
}
