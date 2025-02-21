export interface LoginFormValues {
    email: string;
    password: string
}

export interface RegisterFormValues {
    username: string;
    user: string;
    password: string;
    repeatPassword?: string;
    phone: string;
}

export interface RecoveryFormValues {
    contact: string;
    contactType: 'email' | 'phone';
}

export interface FormState {
    login: LoginFormValues;
    register: RegisterFormValues;
    recoveryPassword: RecoveryFormValues;
}

export interface FormContextType {
  formValues: FormState;
  updateFormValues: (formName: keyof FormState, values: Partial<FormState[keyof FormState]>) => void;
  resetForm: (formName: keyof FormState) => void;
}