export function ToyPreview({ toy }) {
  return (
    <article className='toy-preview'>
      <img className='toy-prev-img' src={require(`../assets/imgs/${toy.imgUrl}`)} alt='toy-img' />
      <div className='toy-prev-meta'>
        <h6 className='toy-prev-name'>{toy.name}</h6>
        <p className='toy-prev-price'>${toy.price}</p>
      </div>
      {toy.labels.length && (
        <div className='toy-prev-labels'>
          {toy.labels.map((l) => (
            <span key={l} className='tag label'>
              {l}
            </span>
          ))}
        </div>
      )}
      <span className='tag stock'>{toy.inStock ? 'In stock' : 'Out of stock'}</span>
    </article>
  )
}
