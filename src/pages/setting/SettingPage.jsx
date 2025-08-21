import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  RotateCcw,
  Shield,
  EyeOff,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "../../axios/uploadAxios";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import { updateUserAction } from "../../redux/user/userAction";
import useLoading from "../../hooks/useLoading";
import useForm from "../../hooks/useForm";
import { passwordFields, personalInfoFields } from "../../config/formCongif";
import FormControl from "../../components/common-Input/FormControl";

const SettingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileUploadProgress, setProfileUploadProgress] = useState(0);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } = useForm({
    fName: user?.fName || "",
    lName: user?.lName || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    phone: user?.phone || "",
    address: user?.address || "Not Provided",
    profilePicture: user?.profilePicture || null,
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  // handleSave function
  const handleSave = async () => {
    if (!formData.password && formData.confirmPassword) {
      toast.error("Please enter your new password as well.");
      return;
    }
    // Validate passwords match if changing password
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match or confirm password is empty.");
      return;
    }

    startLoading();

    try {
      // Create a copy of formData  to send to server without confirmPassword
      const { confirmPassword, ...dataToSend } = formData;

      const response = await dispatch(updateUserAction(user._id, dataToSend));
      if (response.status === "success") {
        stopLoading();
        toast.success("Settings updated successfully");
      }
      // Update the original data and reset password fields
      const updatedFormData = {
        ...formData,
        password: "",
        confirmPassword: "",
      };
      setFormData(updatedFormData);
      setOriginalData(updatedFormData);
    } catch (error) {
      stopLoading();
      toast.error(
        error?.response?.data?.message || "Failed to update settings"
      );
    }
  };

  // handleReset function
  const handleReset = () => {
    setFormData({ ...originalData });
    setProfileUploadProgress(0);
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      setProfilePicture(file);
      handleProfilePictureUpload(file);
    }
  };

  // Function to handle profile picture upload
  const handleProfilePictureUpload = async (file) => {
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("images", file);

      //api call to upload profile picture in cloudinary and get url
      const response = await uploadMedia(uploadFormData, (progress) => {
        setProfileUploadProgress(progress);
      });

      if (response.status === "success") {
        const uploaded = response.payload;
        let profilePictureUrl = "";

        if (Array.isArray(uploaded)) {
          profilePictureUrl = uploaded[0].secure_url;
        }

        // Update form data with profile picture URL
        setFormData((prev) => ({ ...prev, profilePicture: profilePictureUrl }));

        // clear selected file
        setProfilePicture(null);
        toast.success("Profile picture updated successfully!");
      } else {
        toast.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setProfileUploadProgress(0);
    }
  };

  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Profile Picture
              </CardTitle>
              <CardDescription>
                Update your profile picture to personalize your admin account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={formData.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                      />
                      <AvatarFallback className="text-lg">
                        {user?.fName?.charAt(0)?.toUpperCase() +
                          user?.lName?.charAt(0)?.toUpperCase() || "NA"}
                      </AvatarFallback>
                    </Avatar>

                    {/* Upload Progress Overlay */}
                    {profileUploadProgress > 0 && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white">
                        <span className="text-xs font-medium">
                          {Math.round(profileUploadProgress)}%
                          <LoadingSpinner />
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="file-upload"
                    className={`inline-flex items-center px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-100 ${
                      profileUploadProgress > 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {profileUploadProgress > 0
                      ? "Uploading..."
                      : "Change Picture"}
                  </label>

                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                    disabled={profileUploadProgress > 0}
                  />

                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalInfoFields.map((field, index) => (
                  <div
                    key={index}
                    className={field.type === "textarea" ? "col-span-full" : ""}
                  >
                    <FormControl
                      label={field.label}
                      handleOnChange={handleOnChange}
                      inputAttributes={{
                        id: field.name,
                        name: field.name,
                        type: field.type,
                        value: formData[field.name] || "",
                        placeholder: field.placeholder,
                        autoComplete: field.autoComplete,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {passwordFields.map((field, index) => (
                  <FormControl
                    key={index}
                    label={field.label}
                    isPassword={field.isPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleOnChange={handleOnChange}
                    inputAttributes={{
                      id: field.name,
                      name: field.name,
                      type: field.type,
                      value: formData[field.name],
                      placeholder: field.placeholder,
                    }}
                  />
                ))}
              </div>

              {/* Requirements list */}
              <div className="text-sm text-muted-foreground">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              {hasChanges ? "You have unsaved changes" : "All changes saved"}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!hasChanges || isLoading}
                className="border-border hover:bg-muted bg-transparent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
              </Button>

              <Button
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-primary-foreground"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingPage;
