import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import formatDate from "../../utils/FormatDate";

const UserDetailsDialogue = ({ isOpen, onOpenChange, selectedUser }) => {
  // Helper functions for badge variants
  const getRoleBadgeVariant = (role) => {
    return role === "admin" ? "default" : "secondary";
  };

  const getStatusBadgeVariant = (status) => {
    return status === "active" ? "default" : "destructive";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View detailed information about the user
          </DialogDescription>
        </DialogHeader>
        {selectedUser && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">First Name</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.fName}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Last Name</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.lName}
                </p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-muted-foreground">
                {selectedUser.email}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <p className="text-sm text-muted-foreground">
                {selectedUser.phone}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Role</Label>
                <div className="mt-1">
                  <Badge variant={getRoleBadgeVariant(selectedUser.role)}>
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">
                  <Badge variant={getStatusBadgeVariant(selectedUser.status)}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Auth Provider</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.authProvider}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email Verified</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedUser.emailVerified ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Created At</Label>
                <p className="text-sm text-muted-foreground">
                  {formatDate(selectedUser.createdAt)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Updated At</Label>
                <p className="text-sm text-muted-foreground">
                  {formatDate(selectedUser.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialogue;
