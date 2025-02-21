import { createContext, useContext, useState, ReactNode } from 'react';
import { FormState, FormContextType } from '../types/auth';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState<FormState>({
    login: { email: '', password: '' },
    register: { username: '', user: '', password: '', repeatPassword: '', phone: '' },
    recoveryPassword: { contact: '', contactType: 'email' },
  });

  const updateFormValues = (formName: keyof FormState, values: Partial<FormState[keyof FormState]>) => {
    setFormValues((prev) => ({
      ...prev,
      [formName]: { ...prev[formName], ...values },
    }));
  };

  const resetForm = (formName: keyof FormState) => {
    setFormValues((prev) => ({
      ...prev,
      [formName]: Object.keys(prev[formName]).reduce((acc, key) => {
        return { ...acc, [key]: '' };
      }, {}),
    }));
  };

  return (
    <FormContext.Provider value={{ formValues, updateFormValues, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
