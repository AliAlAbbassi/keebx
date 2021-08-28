import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    name: string;
    textarea?: boolean;
    fontsize?: number
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    size: _,
    fontsize,
    ...props
}) => {
    let InputOrTextarea: any = Input;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            {label ? (<FormLabel fontSize={fontsize || 20} htmlFor={field.name} mb={3}>{label}</FormLabel>) : null}
            <InputOrTextarea {...field} {...props} id={field.name} padding={4} fontSize={20} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};