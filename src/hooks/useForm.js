import { useState } from "react";

const handleOnChange = (e, formData, setFormData) => {
  const { name, type } = e.target;

  if (type === "file") {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      [name]: files,
    });
    return;
  }
  const { value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const useForm = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);

  return {
    handleOnChange: (e) => handleOnChange(e, formData, setFormData),
    setFormData,
    formData,
  };
};

export default useForm;
