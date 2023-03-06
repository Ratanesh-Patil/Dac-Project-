const Home=()=>{
    return(
        <>
        <div>
          <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
    <li data-target="#carouselExampleCaptions" data-slide-to={1} />
    <li data-target="#carouselExampleCaptions" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img style={{height:"600px"}} src={process.env.PUBLIC_URL+'../images/slider1.jpg'} className="d-block w-100" alt="Slides" />
      <div className="carousel-caption d-none d-md-block">
        <h5>Find your Bike today!</h5>
        <h4>Book the best Bike for you</h4>
      </div>
    </div>
    <div className="carousel-item">
      <img style={{height:"600px"}} src={process.env.PUBLIC_URL+'../images/slid-image2.jpg'} className="d-block w-100" alt="Slides" />
      <div className="carousel-caption d-none d-md-block">
        <h5>Find the best variant</h5>
        <h4>A lot of variants available</h4>
      </div>
    </div>
    <div className="carousel-item">
      <img style={{height:"600px"}} src={process.env.PUBLIC_URL+'../images/wp2500541-royal-enfield-himalayan-wallpapers.jpg'} className="d-block w-100" alt="Slides" />
      <div className="carousel-caption d-none d-md-block">
        <h5>Best Services</h5>
        <h4>Full Functional Feedback System</h4>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev bg-transparent border-0" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </button>
  <button className="carousel-control-next bg-transparent border-0" type="button" data-target="#carouselExampleCaptions" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </button>
</div>


  <div className="latest-products">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Offers</h2>
            <a href="offers.html">view more <i className="fa fa-angle-right" /></a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="product-item">
            <a href="offers.html"><img src="images/Unicorn.jpg" alt /></a>
            <div className="down-content">
              <a href="offers.html"><h4>Black Honda Unicorn Bike</h4></a>
              <h6><small>from</small> 1000 <small>per weekend</small></h6>
              <h4>The Honda Unicorn BS6 is a commuter motorcycle that competes in the 150-180cc segment. The motorcycle is available in a single variant. The colour options include Pearl Igneous Black, Imperial Red Metallic and Matte Axis Gray Metallic</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="product-item">
            <a href="offers.html"><img src="images/FZ.jpg" alt /></a>
            <div className="down-content">
              <a href="offers.html"><h4>Black Yamaha FZS-FI Bike </h4></a>
              <h6><small>from</small> 2000 <small>per weekend</small></h6>
              <h4>The all new FZS-FI (149 cc) is marking the first BS VI variant rollout from Yamaha in India and is revved up in two new colours - Darknight and Metallic Red along with all existing colours.</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="product-item">
            <a href="offers.html"><img src="images/TVS.jpg" alt /></a>
            <div className="down-content">
              <a href="offers.html"><h4>TVS Apache RTR 160</h4></a>
              <h6><small>from</small> 1500 <small>per weekend</small></h6>
              <h4>TVS Apache RTR 160 comes up with anti-locking braking system. This Apache RTR 160 bike weighs 137 kg and has a fuel tank capacity of 12 liters.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Home;