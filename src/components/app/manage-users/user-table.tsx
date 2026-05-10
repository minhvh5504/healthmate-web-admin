"use client";

import React, { useState } from "react";
import { useUsers, User, UserStatus } from "@/hooks/use-users";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { UserTableToolbar } from "./user-table-toolbar";
import { UserTableContent } from "./user-table-content";
import { UserTablePagination } from "./user-table-pagination";
import { UserTableDialogs } from "./user-table-dialogs";

export function UserTable() {
  const { t } = useTranslation(["dashboard", "common"]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [activeTab, setActiveTab] = useState<UserStatus | "all">("all");

  const { users, total, isLoading, isError, toggleUserStatus, deleteUser } =
    useUsers(page, limit, activeTab);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const totalPages = Math.ceil(total / limit);
  const paginatedUsers = users; // Data is already paginated from server

  // Handlers
  const handleToggleStatus = async () => {
    if (!selectedUser) return;
    try {
      const result = await toggleUserStatus(selectedUser.id);
      if (result.ok) {
        toast.success(
          `Đã ${selectedUser.isActive ? "khóa" : "mở khóa"} người dùng thành công`,
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const result = await deleteUser(userToDelete.id);
      if (result.ok) {
        toast.success("Đã xóa người dùng thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi xóa");
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 pb-4 transition-all">
      {/* 1. Toolbar: Title & Filters */}
      <UserTableToolbar
        title={t("dashboard:sidebar.manageUsers")}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      {/* 2. Table Content */}
      <UserTableContent
        users={paginatedUsers}
        isLoading={isLoading}
        isError={isError}
        noDataText={t("common:noData")}
        startIndex={(page - 1) * limit}
        onView={(user) => console.log("View user", user)}
        onToggleStatus={setSelectedUser}
        onDelete={setUserToDelete}
      />

      {/* 3. Pagination */}
      <UserTablePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* 4. Action Dialogs */}
      <UserTableDialogs
        selectedUser={selectedUser}
        userToDelete={userToDelete}
        onCloseStatusDialog={() => setSelectedUser(null)}
        onCloseDeleteDialog={() => setUserToDelete(null)}
        onConfirmStatus={handleToggleStatus}
        onConfirmDelete={handleDeleteUser}
      />
    </div>
  );
}
