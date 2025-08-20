/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormControl = (props) => {
  const {
    label,
    inputAttributes,
    handleOnChange,
    options = [],
    isPassword = false,
    showPassword,
    setShowPassword,
  } = props;

  // password field with toggle
  if (isPassword) {
    return (
      <div className="mb-4">
        <Label
          htmlFor={inputAttributes.id}
          className="block text-sm font-bold mb-2"
        >
          {label}
        </Label>
        <div className="relative">
          <Input
            {...inputAttributes}
            type={showPassword ? "text" : "password"}
            value={inputAttributes.value || ""}
            onChange={(e) => handleOnChange(e)}
            className="w-full p-3 border rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          />
          <Button
            variant="ghost"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground hover:bg-transparent"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    );
  }

  //use when we need to select a value from a list
  if (inputAttributes.type === "select") {
    return (
      <div className="mb-3">
        <Label htmlFor={inputAttributes.id} className="block font-bold mb-2">
          {label}
        </Label>
        <Select
          value={inputAttributes.value || ""}
          onValueChange={(value) =>
            handleOnChange({ target: { name: inputAttributes.name, value } })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={inputAttributes.placeholder || ""} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  //use when we need to enter a long text
  if (inputAttributes.type === "textarea") {
    return (
      <div className="mb-6 col-span-full">
        <Label htmlFor={inputAttributes.id} className="block font-bold mb-2">
          {label}
        </Label>
        <Textarea
          {...inputAttributes}
          value={inputAttributes.value || ""}
          onChange={(e) => handleOnChange(e)}
          className="w-full p-3 border rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
        />
      </div>
    );
  }

  //use when we need to enter form data
  return (
    <div className="mb-4 ">
      <Label
        htmlFor={inputAttributes.id}
        className="block text-sm  mb-2 font-bold text-gray-900 dark:text-white "
      >
        {label}
      </Label>

      <Input
        {...inputAttributes}
        value={inputAttributes.value || ""}
        onChange={(e) => handleOnChange(e)}
        className=" dark:text-white mb-2 block w-full rounded-lg border-0 px-3 py-2
         text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset 
        focus-visible:ring-green-600 focus-visible:z-10 sm:text-sm/6"
      />
    </div>
  );
};

export default FormControl;
