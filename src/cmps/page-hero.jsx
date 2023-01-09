import heroImg from '../assets/imgs/toys-collection1.png'

export function PageHero() {
  return (
    <section className='page-hero full main-layout'>
      <div className='wrapper'>
        <div className='hero-txt-container'>
          <h2>Mister Toy</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi harum, dolore
            molestias et, consequuntur eaque soluta aspernatur fuga ducimus nulla quae, beatae
            reprehenderit nostrum quia animi dolor praesentium.
          </p>
          <button className='btn-primary'>Start shopping</button>
        </div>
        <div className='hero-img-container'>
          <img className='hero-img' src={heroImg} />
        </div>
      </div>
    </section>
  )
}
