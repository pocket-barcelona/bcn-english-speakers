'use client';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import styles from './index.module.css';

type AutocompleteProps = {
  id: string;
  items: { id: string; value: string }[];
  placeholder?: string;
  label?: string;
  onValueChange?: (value: string) => void;
};

export default function Autocomplete({ items, onValueChange, placeholder, label, id }: AutocompleteProps) {
  return (
    <BaseAutocomplete.Root items={items} onValueChange={onValueChange}>
      <label className={styles.Label} htmlFor={id}>
        {label}
        <BaseAutocomplete.Input placeholder={placeholder} className={styles.Input} id={id} />
      </label>

      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner className={styles.Positioner} sideOffset={4}>
          <BaseAutocomplete.Popup className={styles.Popup}>
            <BaseAutocomplete.Empty>
              <div className={styles.Empty}>No items found.</div>
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className={styles.List}>
              {(item: AutocompleteProps['items'][number]) => (
                <BaseAutocomplete.Item key={item.id} className={styles.Item} value={item}>
                  {item.value}
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
