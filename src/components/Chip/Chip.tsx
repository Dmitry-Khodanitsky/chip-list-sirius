import styles from './Chip.module.css'

export interface ChipProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
}

export const Chip: React.FC<ChipProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${isSelected ? styles.selected : ''}`}
    >
      {label}
    </button>
  )
}
