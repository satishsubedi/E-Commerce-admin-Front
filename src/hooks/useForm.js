import { useState } from "react";

const handleOnChnage = (e, formData, setFormData) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });
};

const useForm = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);

  return {
    handleOnChnage: (e) => handleOnChnage(e, formData, setFormData),
    setFormData,
    formData,
  };
};
export default useForm;
