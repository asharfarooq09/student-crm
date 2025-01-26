import { useState } from "react";

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    // Validate input
    if (validate) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e, onSubmit) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all inputs
    const newErrors = {};
    for (const [key, value] of Object.entries(values)) {
      if (validate) {
        newErrors[key] = validate(key, value);
      }
    }

    // Update errors and proceed only if no errors
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors && onSubmit) {
      await onSubmit(values);
    }

    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
