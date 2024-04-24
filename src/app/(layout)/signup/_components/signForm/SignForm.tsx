"use client";

import { Form } from "@/components/ui/form";
import FormField from "@/app/(layout)/signup/_components/formField/FormField";
import { SignUpInputConstants } from "@/constants/user.constants";
import { UseFormReturn } from "react-hook-form";

interface Props {
  fields: SignUpInputConstants[];
  form: UseFormReturn<{ [p: string]: string }, any, undefined>;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

function SignForm({ fields, form, handleOnSubmit, children }: Props) {
  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-5 justify-between h-[400px]"
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

export default SignForm;
