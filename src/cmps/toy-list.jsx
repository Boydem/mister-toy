import { ToyActionsBtns } from './toy-actions-btns.jsx'
import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys, onToyDetails, onEditToy, onRemoveToy }) {
  return (
    <ul className='toy-list flex'>
      {toys.map((toy) => {
        return (
          <li className='toy-li' key={`${toy._id}`}>
            <ToyPreview toy={toy} />
            <ToyActionsBtns
              toy={toy}
              onEditToy={onEditToy}
              onToyDetails={onToyDetails}
              onRemoveToy={onRemoveToy}
            />
          </li>
        )
      })}
    </ul>
  )
}
