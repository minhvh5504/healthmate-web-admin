'use client';

import React from 'react';
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
import { cn } from '@/lib/utils';
import { User } from '@/hooks/use-users';
import { useTranslation } from 'react-i18next';

interface UserTableDialogsProps {
    selectedUser: User | null;
    userToDelete: User | null;
    onCloseStatusDialog: () => void;
    onCloseDeleteDialog: () => void;
    onConfirmStatus: () => void;
    onConfirmDelete: () => void;
}

export function UserTableDialogs({
    selectedUser,
    userToDelete,
    onCloseStatusDialog,
    onCloseDeleteDialog,
    onConfirmStatus,
    onConfirmDelete
}: UserTableDialogsProps) {
    const { t } = useTranslation('user');
    return (
        <>
            {/* Status Toggle Dialog */}
            <AlertDialog
                open={!!selectedUser}
                onOpenChange={(open) => !open && onCloseStatusDialog()}
            >
                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-slate-800">
                            {selectedUser?.isActive ? t("dialogs.status.titleLock") : t("dialogs.status.titleUnlock")}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            {selectedUser?.isActive 
                                ? t("dialogs.status.descriptionLock", { name: selectedUser?.fullName }) 
                                : t("dialogs.status.descriptionUnlock", { name: selectedUser?.fullName })}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 pt-4">
                        <AlertDialogCancel className="rounded-xl border-slate-100 text-slate-500 font-bold hover:bg-slate-50">
                            {t("dialogs.status.cancel")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirmStatus}
                            className={cn(
                                "rounded-xl font-bold text-white shadow-lg transition-all",
                                selectedUser?.isActive
                                    ? "bg-amber-500 hover:bg-amber-600 shadow-amber-100"
                                    : "bg-green-500 hover:bg-green-600 shadow-green-100",
                            )}
                        >
                            {t("dialogs.status.confirm")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Dialog */}
            <AlertDialog
                open={!!userToDelete}
                onOpenChange={(open) => !open && onCloseDeleteDialog()}
            >
                <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-slate-800">
                            {t("dialogs.delete.title")}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            {t("dialogs.delete.description", { name: userToDelete?.fullName })}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 pt-4">
                        <AlertDialogCancel className="rounded-xl border-slate-100 text-slate-500 font-bold hover:bg-slate-50">
                            {t("dialogs.delete.cancel")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirmDelete}
                            className="rounded-xl font-bold text-white shadow-lg transition-all bg-red-600 hover:bg-red-700 shadow-red-100"
                        >
                            {t("dialogs.delete.confirm")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
