const Contact = () =>{
    return (
        <>
        <div>
  <div className="page-heading contact-heading header-text" style={{backgroundImage: 'url(images/slider-image-3-1920x600.jpg)'}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-content">
            <h4>Bike rental</h4>
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="find-us">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Our Location on Maps</h2>
          </div>
        </div>
        <div className="col-md-8">
          <div id="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.4084900187513!2d73.7556439148663!3d18.645656687336274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f04635518b%3A0xea525f504f61f2a4!2sInstitute%20for%20Advanced%20Computing%20%26%20Software%20Development!5e0!3m2!1sen!2sin!4v1678443213054!5m2!1sen!2sin" width="100%" height="330px" frameBorder={0} style={{border: 0}} allowFullScreen />
          </div>
        </div>
        <div className="col-md-4">
          <div className="left-content">
            <h4>About our office <br></br>
                Bike Rental System
            </h4>
            <p>Address : IACSD Akurdi ,Pune <br />
               Ratnesh Patil and Krushna Bairagi <br />
               phone : 7350402226 <br />
               Email : ratnesh.k.patil@gmail.com <br />
                       krushnabairagi08@gmail.com <br />
               Looking for more information <br />
               feel free to contact us on above details 
            </p>
            {/* <ul className="social-icons">
              <li><a href="#"><i className="fa fa-facebook" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" /></a></li>
              <li><a href="#"><i className="fa fa-linkedin" /></a></li>
              <li><a href="#"><i className="fa fa-behance" /></a></li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="send-message">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-heading">
            <h2>Send us a Message</h2>
          </div>
        </div>
        <div className="col-md-8">
          <div className="contact-form">
            <form id="contact" action method="post">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input name="name" type="text" className="form-control" id="name" placeholder="Full Name" required />
                  </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input name="email" type="text" className="form-control" id="email" placeholder="E-Mail Address" required />
                  </fieldset>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <fieldset>
                    <input name="subject" type="text" className="form-control" id="subject" placeholder="Subject" required />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <textarea name="message" rows={6} className="form-control" id="message" placeholder="Your Message" required defaultValue={""} />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <button type="submit" id="form-submit" className="filled-button">Send Message</button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          <img src="/images/aboutus.jpg" className="img-fluid" alt />
          <h5 className="text-center" style={{marginTop: 15}}>Administrator</h5>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Contact;