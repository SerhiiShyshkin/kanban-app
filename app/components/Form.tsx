"use client";

import { FormEvent, ReactNode, FC } from "react";

type FormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
