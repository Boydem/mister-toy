import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
export function ToyActionsBtns({ onToyDetails, onEditToy, onRemoveToy, toy }) {
  return (
    <section className='toy-actions-btns'>
      <button onClick={() => onToyDetails(toy._id)} className='btn-rnd-s'>
        <InfoOutlinedIcon />
      </button>
      <button onClick={() => onEditToy(toy._id)} className='btn-rnd-s'>
        <EditOutlinedIcon />
      </button>
      <button onClick={() => onRemoveToy(toy._id)} className='btn-rnd-s'>
        <DeleteOutlinedIcon />
      </button>
    </section>
  )
}
