"use client";

import { FormEvent, ReactNode } from "react";

type FormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const Form = ({ onSubmit, children }: FormProps) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
