import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys }) {
  return (
    <ul className='toy-list flex'>
      {toys.map((toy) => {
        return (
          <li key={`${toy._id}`}>
            <ToyPreview toy={toy} />
          </li>
        )
      })}
    </ul>
  )
}
