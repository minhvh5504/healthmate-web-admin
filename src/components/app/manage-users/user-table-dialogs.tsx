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
                            Xác nhận {selectedUser?.isActive ? "khóa" : "mở khóa"} tài khoản
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            Bạn có chắc chắn muốn{" "}
                            {selectedUser?.isActive ? "khóa" : "mở khóa"} tài khoản của{" "}
                            <b>{selectedUser?.fullName}</b>?
                            {selectedUser?.isActive
                                ? " Sau khi khóa, người dùng sẽ không thể đăng nhập vào hệ thống."
                                : " Sau khi mở khóa, người dùng có thể đăng nhập lại bình thường."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 pt-4">
                        <AlertDialogCancel className="rounded-xl border-slate-100 text-slate-500 font-bold hover:bg-slate-50">
                            Hủy
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
                            Xác nhận
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
                            Xác nhận xóa người dùng
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            Hành động này <b>không thể hoàn tác</b>. Bạn có chắc chắn muốn xóa vĩnh viễn người dùng <b>{userToDelete?.fullName}</b> khỏi hệ thống?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 pt-4">
                        <AlertDialogCancel className="rounded-xl border-slate-100 text-slate-500 font-bold hover:bg-slate-50">
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onConfirmDelete}
                            className="rounded-xl font-bold text-white shadow-lg transition-all bg-red-600 hover:bg-red-700 shadow-red-100"
                        >
                            Xóa vĩnh viễn
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
