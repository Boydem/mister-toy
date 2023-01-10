import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [])

  function loadToy() {
    toyService
      .get(toyId)
      .then(setToy)
      .catch((err) => {
        navigate('/toy')
      })
  }

  if (!toy) return <div>Loading...</div>
  return (
    <section className='toy-details main-layout'>
      <div className='main-container'>
        <div className='details-btns'>
          <button onClick={() => navigate('/toy')} className='btn-outline'>
            Back
          </button>
        </div>
        <div className='img-container'>
          <div className='toy-actions'>
            <button onClick={() => navigate(`/toy/edit/${toy._id}`)} className='btn-primary'>
              Edit
            </button>
            <button className='btn-primary'>Remove</button>
          </div>
          <img
            className='toy-details-img'
            src={require(`../assets/imgs/${toy.imgUrl}`)}
            alt='toy-img'
          />
        </div>
        <div className='txt-container'>
          <h2 className='t-details-name'>{toy.name}</h2>

          <h4 className='t-details-price'>{toy.price}</h4>

          <section className='more-info'>
            <p>
              Type:{' '}
              {toy.labels?.map((l) => (
                <span className='tag'>{l}</span>
              ))}
            </p>
            {/* DONT FORGET TO REMOVE THIS ONCE YOU HAVE SUPPORTED createdAt in db */}
            {toy.createdAt && (
              <p>
                Created at: <span>{utilService.formatTime(toy.createdAt)}</span>
              </p>
            )}

            <p>
              Stock status: <span>{toy.inStock ? 'In stock' : 'Out of stock'}</span>
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
