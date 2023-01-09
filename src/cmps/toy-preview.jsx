export function ToyPreview({ toy }) {
  return (
    <article className='toy-preview'>
      <h4 className='toy-prev-name'>{toy.name}</h4>
      {toy.labels.length && (
        <div className='toy-prev-labels'>
          {toy.labels.forEach((l) => (
            <span key={l} className='tag'>
              {l}
            </span>
          ))}
        </div>
      )}
      <p className='toy-prev-price'>{toy.price}</p>
      <span className='tag toy-prev-stock'>{toy.inStock ? 'In stock' : 'Out of stock'}</span>
    </article>
  )
}
