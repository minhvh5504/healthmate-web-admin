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

interface MedicineTableDialogsProps {
  medicineToDelete: Medication | null;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
}

export function MedicineTableDialogs({
  medicineToDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
}: MedicineTableDialogsProps) {
  return (
    <>
      {/* Delete Dialog */}
      <AlertDialog
        open={!!medicineToDelete}
        onOpenChange={(open) => !open && onCloseDeleteDialog()}
      >
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
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
    </>
  );
}
