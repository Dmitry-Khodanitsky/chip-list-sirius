import * as RadixPopover from '@radix-ui/react-popover'
import styles from './Popover.module.css'
import chipStyles from '../Chip/Chip.module.css'

interface PopoverProps<T> {
  items: T[]
  selectedId: string | number | null
  onSelect: (id: string | number) => void
  renderItem: (
    item: T,
    isSelected: boolean,
    onClick: () => void,
  ) => React.ReactNode
  getKey: (item: T) => string | number
}

export function Popover<T>({
  items,
  selectedId,
  onSelect,
  renderItem,
  getKey,
}: PopoverProps<T>) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button className={chipStyles.chip} aria-label="other chips">
          ···
        </button>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          className={styles.popoverContent}
          sideOffset={8}
          align="end"
        >
          <div className={styles.popoverList}>
            {items.map((item) => {
              const id = getKey(item)
              const isSelected = selectedId === id
              return (
                <div key={id}>
                  {renderItem(item, isSelected, () => onSelect(id))}
                </div>
              )
            })}
          </div>
          <RadixPopover.Arrow className={styles.arrow} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
