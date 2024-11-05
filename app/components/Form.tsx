"use client";

import React, { useState } from "react";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export { Form };