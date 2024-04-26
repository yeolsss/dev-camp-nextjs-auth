"use client";

import { Form } from "@/components/ui/form";
import { SignUpInputConstants } from "@/constants/user.constants";
import { UseFormReturn } from "react-hook-form";
import FormField from "@/app/(providers)/(root)/(auth)/signup/_components/formField";

interface Props {
  fields: SignUpInputConstants[];
  form: UseFormReturn<{ [p: string]: string }, any, undefined>;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  justifyContent?: string;
  gap?: string;
  children: React.ReactNode;
}

function AuthForm({
  fields,
  form,
  handleOnSubmit,
  justifyContent = "justify-between",
  gap = "gap-5",
  children,
}: Props) {
  return (
    <>
      <Form {...form}>
        <form
          className={`flex flex-col h-[400px] ${gap} ${justifyContent}`}
          onSubmit={handleOnSubmit}
        >
          <section className="flex flex-col gap-5">
            {fields.map((field) => (
              <FormField key={field.id} id={field} />
            ))}
          </section>
          {children}
        </form>
      </Form>
    </>
  );
}

export default AuthForm;
