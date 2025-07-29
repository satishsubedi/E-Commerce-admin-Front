import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import useForm from "../../hooks/useForm";
import {
  initialSignupFormData,
  SignUpFormControls,
} from "../../config/formCongif";
import FormControl from "../common-Input/FormControl";
import { useDispatch } from "react-redux";
import {
  createUserAction,
  updateUserAction,
} from "../../redux/user/userAction";
import { toast } from "react-toastify";
import LoadingSpinner from "../helper/LoadingSpinner";
import useLoading from "../../hooks/useLoading";

const CreateOrEditUserDialogue = (props) => {
  const {
    isOpen,
    onOpenChange,
    userId = null,
    userData = null,
    onSave,
  } = props;

  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } = useForm(
    initialSignupFormData
  );

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        fName: userData.fName || "",
        lName: userData.lName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        role: userData.role || "user",
        status: userData.status || "active",
      });
    } else {
      setFormData(initialSignupFormData);
    }
  }, [userData, setFormData]);

  const handleSave = async () => {
    startLoading();

    try {
      if (userId) {
        // Update existing user - exclude password field
        const { password, ...updateData } = formData;
        const response = await dispatch(updateUserAction(userId, updateData));

        if (response?.status === "success") {
          toast.success(response?.message || "User updated!");
          onSave && onSave(updateData);
          onOpenChange(false);
        }
      } else {
        // Create new user
        const response = await dispatch(createUserAction(formData));

        if (response?.status === "success") {
          toast.success(response?.message || "User created!");
          onSave && onSave(formData);
          onOpenChange(false);
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user. Please try again.");
    } finally {
      stopLoading();
    }
  };

  // Get form controls - show password only when creating new user
  const formControls = SignUpFormControls.filter(
    (field) => !userId || field.name !== "password"
  );

  // Separate fields for different layouts
  const nameFields = formControls.filter(
    (field) => field.name === "fName" || field.name === "lName"
  );
  const optionFields = formControls.filter(
    (field) => field.name === "role" || field.name === "status"
  );
  const otherFields = formControls.filter(
    (field) => !["fName", "lName", "role", "status"].includes(field.name)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{userId ? "Edit User" : "Create New User"}</DialogTitle>
          <DialogDescription>
            {userId
              ? "Update user information and permissions"
              : "Add a new user to the system"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Name fields in same row */}
          <div className="grid grid-cols-2 gap-4">
            {nameFields.map((field, index) => (
              <div key={index}>
                <FormControl
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                    placeholder: field.placeholder,
                    autoComplete: field.autoComplete,
                    required: !userId || field.name !== "password",
                    id: field.name,
                  }}
                  options={field.options}
                  className="block w-full rounded-lg border-0"
                />
              </div>
            ))}
          </div>

          {/* Other fields (email, phone, password) */}
          {otherFields.map((field, index) => (
            <div key={index}>
              <FormControl
                label={field.label}
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: field.type,
                  name: field.name,
                  value: formData[field.name],
                  placeholder: field.placeholder,
                  autoComplete: field.autoComplete,
                  required: !userId || field.name !== "password",
                  id: field.name,
                }}
                options={field.options}
                className="block w-full rounded-lg border-0"
              />
            </div>
          ))}

          {/* Role and Status fields in same row */}
          <div className="grid grid-cols-2 gap-4">
            {optionFields.map((field, index) => (
              <div key={index}>
                <FormControl
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                    placeholder: field.placeholder,
                    autoComplete: field.autoComplete,
                    required: !userId || field.name !== "password",
                    id: field.name,
                  }}
                  options={field.options}
                  className="block w-full rounded-lg border-0"
                />
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner />
            ) : userId ? (
              "Save Changes"
            ) : (
              "Create User"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrEditUserDialogue;
