import { useEffect, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../customHooks/useForm'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { toyService } from '../services/toy.service'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit, handleChange] = useForm(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  function saveToy() {
    toyService
      .save(toyToEdit)
      .then(() => {
        showSuccessMsg('Toy saved!')
        navigate('/toy')
      })
      .catch((err) => {
        showErrorMsg(err)
        console.log('err:', err)
      })
  }

  function loadToy() {
    toyService
      .get(toyId)
      .then(setToyToEdit)
      .catch((err) => {
        navigate('/toy')
      })
  }

  return (
    <section className='toy-details toy-edit main-layout'>
      <div className='main-container'>
        <div className='img-container'>
          {}
          <img
            className='toy-details-img'
            src={require(`../assets/imgs/${toyToEdit._id ? toyToEdit.imgUrl : '15.png'}`)}
            alt='toy-img'
          />
        </div>
        <div className='edit-container'>
          <h2 className='t-details-name'>Edit toy</h2>
          <label htmlFor='text'>
            Toy Name
            <input
              onChange={handleChange}
              type='text'
              name='name'
              id='name'
              placeholder={toyToEdit?.name}
            />
          </label>
          <label htmlFor='price'>
            Toy Price
            <input
              onChange={handleChange}
              type='number'
              name='price'
              id='price'
              placeholder={toyToEdit?.price}
            />
          </label>
          <label htmlFor='inStock'>
            Stock Status
            <input
              onChange={handleChange}
              type='checkbox'
              name='inStock'
              id='inStock'
              defaultChecked={toyToEdit?.inStock}
            />
          </label>
          <button style={{ marginTop: 'auto' }} onClick={saveToy} className='btn-primary'>
            Save
          </button>
        </div>
      </div>
    </section>
  )
}
