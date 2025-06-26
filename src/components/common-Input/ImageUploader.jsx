import React, { useRef } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

/**
 * ImageUploader Component
 * Props:
 * - multiple: boolean (allow multiple file selection)
 * - selectedFiles: array of File (for preview before upload)
 * - onFileChange: function (called with FileList or array of File)
 * - onRemoveSelected: function (index or void)
 * - onUpload: function (trigger upload)
 * - isLoading: boolean (uploading state)
 * - uploadProgress: number (0-100)
 * - uploadedImages: array of string (urls of already uploaded images)
 * - onRemoveUploaded: function (imageUrl, index)
 * - label: string (label for input)
 * - maxSizeMB: number (optional, for info display)
 */
const ImageUploader = ({
  multiple = false,
  selectedFiles = [],
  onFileChange,
  onRemoveSelected,
  onUpload,
  isLoading = false,
  uploadProgress = 0,
  uploadedImages = [],
  onRemoveUploaded,
  label = "Upload Images",
  maxSizeMB = 5,
}) => {
  const inputRef = useRef();

  return (
    <div className="w-full">
      <Label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileChange}
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-gray-50">
          <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center">
            <span className="font-medium text-primary">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to {maxSizeMB}MB
          </p>
        </div>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Selected file{selectedFiles.length > 1 ? "s" : ""} (
            {selectedFiles.length})
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="text-xs bg-white rounded-full px-3 py-2 flex items-center gap-2 border shadow-sm"
              >
                <ImageIcon className="h-3 w-3 text-gray-500" />
                <span className="max-w-32 truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSelected(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={onUpload}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span>Uploading... {uploadProgress}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                <span>
                  Upload {selectedFiles.length} Image
                  {selectedFiles.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </Button>
          {/* Progress Bar */}
          {isLoading && uploadProgress > 0 && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Uploaded Images Preview (for gallery) */}
      {uploadedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Uploaded Images ({uploadedImages.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploadedImages.map((image, index) => (
              <div
                key={image}
                className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
              >
                <img
                  src={image}
                  alt={`Uploaded image ${index + 1}`}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                  <Button
                    variant="ghost"
                    className="text-white bg-black/70 hover:bg-black/90 px-3 py-1 rounded-full text-xs transition-colors"
                    onClick={() => window.open(image, "_blank")}
                  >
                    View
                  </Button>
                  {onRemoveUploaded && (
                    <Button
                      variant="destructive"
                      className="text-white hover:bg-red-700 px-3 py-1 rounded-full text-xs transition-colors"
                      onClick={() => onRemoveUploaded(image, index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
