import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useLoading from "../../hooks/useLoading";
import useForm from "../../hooks/useForm";
import {
  CouponFormControls,
  initialCouponFormData,
} from "../../config/formCongif";
import FormControl from "../../components/common-Input/FormControl";
import { createCoupon, updateCoupon } from "../../axios/couponAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/helper/LoadingSpinner";

const CreateOrEditCouponDialogue = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  editingCoupon,
  setEditingCoupon,
  fetchCoupons,
}) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } = useForm(
    initialCouponFormData
  );

  //Pre-fill form when editing
  useEffect(() => {
    if (editingCoupon) {
      setFormData({
        code: editingCoupon?.code,
        type: editingCoupon?.type,
        value: editingCoupon?.value,
        expiryDate: editingCoupon?.expiryDate?.split("T")[0] || "",
        usageLimit: editingCoupon?.usageLimit,
      });
    } else {
      setFormData(initialCouponFormData);
    }
  }, [editingCoupon, setFormData]);

  const handleCreateOrEditCoupon = async () => {
    try {
      // Basic validation
      const isAnyEmpty = Object.values(formData).some((v) => v === "");
      if (isAnyEmpty) {
        toast.error("All fields are required");
        return;
      }

      startLoading();

      // Decide which API call to make
      const apiCall = editingCoupon
        ? () => updateCoupon(editingCoupon._id, formData)
        : () => createCoupon(formData);

      const response = await apiCall();

      // Handle API business errors
      if (response?.status === "error") {
        toast.error(response.message || "Something went wrong!");
        return;
      }

      toast.success(
        response.message ||
          (formData._id ? "Coupon updated!" : "Coupon created!")
      );

      //again fetch latest coupons
      fetchCoupons();

      setFormData(initialCouponFormData);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("create/edit coupon error.", error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
          </DialogTitle>
          <DialogDescription>
            {editingCoupon
              ? "Update the coupon details below."
              : "Add a new discount coupon for your customers."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {CouponFormControls.map((field, index) => (
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
                  required: true,
                  id: field.name,
                }}
                className="block w-full rounded-lg border-0"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsCreateDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleCreateOrEditCoupon}>
            {editingCoupon ? "Update" : "Create"}
            {isLoading && <LoadingSpinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrEditCouponDialogue;
