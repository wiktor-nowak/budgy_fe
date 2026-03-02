import { useState, useEffect } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";

type CurrencyFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  min?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export function CurrencyField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  min = 0.0,
  disabled,
  placeholder = "0.00",
  className,
}: CurrencyFieldProps<TFieldValues>) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  const [localValue, setLocalValue] = useState<string>(
    typeof field.value === "number" ? field.value.toString() : "",
  );

  useEffect(() => {
    if (typeof field.value === "number") {
      setLocalValue(field.value.toString());
    }
  }, [field.value]);

  const handleChange = (raw: string) => {
    if (!/^\d*\.?\d*$/.test(raw)) return;

    setLocalValue(raw);

    const parsed = Number(raw);

    if (!Number.isNaN(parsed)) {
      field.onChange(parsed);
    } else {
      field.onChange(undefined);
    }
  };

  const handleBlur = () => {
    if (!localValue) {
      field.onChange(min);
      setLocalValue(min.toFixed(2));
      field.onBlur();
      return;
    }

    const parsed = Number(localValue);

    if (Number.isNaN(parsed)) {
      field.onChange(min);
      setLocalValue(min.toFixed(2));
      field.onBlur();
      return;
    }

    const clamped = Math.max(parsed, min);
    const rounded = Math.round(clamped * 100) / 100;

    field.onChange(rounded);
    setLocalValue(rounded.toFixed(2));
    field.onBlur();
  };

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <InputGroup>
          <InputGroupInput
            type="text"
            inputMode="decimal"
            value={localValue}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>PLN</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormControl>

      <FormMessage>{fieldState.error?.message}</FormMessage>
    </FormItem>
  );
}
