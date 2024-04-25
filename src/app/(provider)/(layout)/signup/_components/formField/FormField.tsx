"use client";

import {
  FormControl,
  FormField as ChadFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AUTH_ROLE, SignUpInputConstants } from "@/constants/user.constants";

interface Props {
  id: SignUpInputConstants;
}

function FormField({ id }: Props) {
  return (
    <ChadFormField
      name={id.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{id.label}</FormLabel>
          <FormControl>
            {id.id != AUTH_ROLE.id ? (
              <Input
                type={id.inputType}
                placeholder={id.placeholder}
                {...field}
              />
            ) : (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="역할을 선택해주세요" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="user">일반 사용자</SelectItem>
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;
