function About(){
    return (
        <>
        <div className="page-heading about-heading header-text" style={{backgroundImage: 'url(images/slider-image-1-1920x6002.jpg)'}}>
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <div className="text-content">
                <h4>about us</h4>
                <h2>Bike rental</h2>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="best-features about-features">
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <div className="section-heading">
                <h2>We are providing Bike on rents</h2>
                </div>
            </div>
            <div className="col-md-6">
                <div className="right-image">
                <img src="images/aboutus.jpg" alt />
                </div>
            </div>
            <div className="col-md-6">
                <div className="left-content">
                <h4>Welcome to Bike Rental System</h4>
                <p>
                    If you're looking for an easy bike rental service booked directly through a vendor and not through a broker,
                    If you need a reliable and flexible bike rental company that offers comprehensive conditions,
                    If you want an all-inclusive rental bike with no hidden costs, book at Bike Rental System
                    Our prices include fully comprehensive insurance, unlimited mileage, 24-hour emergency service and road tax!</p>
                <ul className="social-icons">
                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                    <li><a href="#"><i className="fa fa-twitter" /></a></li>
                    <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                    <li><a href="#"><i className="fa fa-behance" /></a></li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>

        </>
    )
}

export default About;