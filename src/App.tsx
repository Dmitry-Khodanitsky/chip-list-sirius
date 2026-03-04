import { ChipList } from './components/ChipList'
import { Chip } from './components/Chip'
import { CHIPS_MOCK } from './mocks/chips'

export const App = () => {
  return (
    <ChipList
      items={CHIPS_MOCK}
      getKey={(item) => item.id}
      renderItem={(item, isSelected, onClick) => (
        <Chip label={item.label} isSelected={isSelected} onClick={onClick} />
      )}
    />
  )
}
