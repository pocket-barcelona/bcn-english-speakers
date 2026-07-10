"use client";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ComponentProps } from "preact";
import { useId } from "preact/hooks";
import styles from "./index.module.css";

export type ComboboxValue = {
  label: string;
  value: string;
};

export interface ComboboxProps {
  label: string;
  items: ComboboxValue[];
  onValueChange: (value: ComboboxValue | null) => void;
  placeholder?: string;
}

export default function Combobox({ label, items, placeholder, onValueChange }: ComboboxProps) {
  const id = useId();
  return (
    <BaseCombobox.Root items={items} onValueChange={onValueChange}>
      <div className={styles.Label}>
        <label htmlFor={id}>{label}</label>
        <BaseCombobox.InputGroup className={styles.InputGroup}>
          <BaseCombobox.Input
            placeholder={placeholder}
            id={id}
            className={styles.Input}
          />
          <div className={styles.ActionButtons}>
            <BaseCombobox.Clear
              className={styles.Clear}
              aria-label="Clear selection"
            >
              <XIcon />
            </BaseCombobox.Clear>
            <BaseCombobox.Trigger
              className={styles.Trigger}
              aria-label="Open popup"
            >
              <CaretDownIcon />
            </BaseCombobox.Trigger>
          </div>
        </BaseCombobox.InputGroup>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className={styles.Positioner} sideOffset={4}>
          <BaseCombobox.Popup className={styles.Popup}>
            <BaseCombobox.Empty>
              <div className={styles.Empty}>No items found.</div>
            </BaseCombobox.Empty>
            <BaseCombobox.List className={styles.List}>
              {(item: ComboboxProps["items"][number]) => (
                <BaseCombobox.Item
                  key={item.value}
                  value={item}
                  className={styles.Item}
                >
                  <BaseCombobox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </BaseCombobox.ItemIndicator>
                  <span className={styles.ItemText}>{item.label}</span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{
        display: "block",
        // ...props.style
      }}
    >
      <title>Check icon</title>
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function XIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      {...props}
      style={{
        display: "block",
        // ...props.style
      }}
    >
      <title>Cross icon</title>
      <path d="m4.5 4.5 7 7m-7 0 7-7" />
    </svg>
  );
}

function CaretDownIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{
        display: "block",
        // ...props.style
      }}
    >
      <title>Caret down icon</title>
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}
