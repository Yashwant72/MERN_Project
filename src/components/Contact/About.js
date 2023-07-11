import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min';
import './about.css'
const About = () => {
  return (
    <section className='about-container'>
      <div className='about'>
        <h1>About The Team</h1>

        <div className='about-cards'>
          <div class="card" >
            <div class="card-body">
              <h4 class="card-text">Samaksh Gupta</h4>
              <p class="card-text">MERN Stack Developer</p>
              <p class="card-text">Ph No: 9818996231</p>
              <p class="card-text">Email:samaksh.gupta2020@vitstudent.ac.in</p>
            </div>
          </div>

          <div class="card" >
            <div class="card-body">
              <h4 class="card-text">Shikhar Srivastava</h4>
              <p class="card-text">MERN Stack Developer</p>
              <p class="card-text">Ph No: 9560336160</p>
              <p class="card-text">Email: shikhar.srivastava2020@vitstudent.ac.in</p>
            </div>
          </div>

          <div class="card" >
            <div class="card-body">
              <h4 class="card-text">Tejas Ravindra Rote</h4>
              <p class="card-text">MERN Stack Developer</p>
              <p class="card-text">Ph No: 8968172912</p>
              <p class="card-text">Email: tejasravindra.rote2020@vitstudent.ac.in</p>
            </div>
          </div>

          <div class="card" >
            <div class="card-body">
              <h4 class="card-text">Yashwant Chavan</h4>
              <p class="card-text">MERN Stack Developer</p>
              <p class="card-text">Ph No: 6383349648</p>
              <p class="card-text">Email: yashwant.chavan2020@vitstudent.ac.in</p>
            </div>
          </div>


        </div>

        <div className='about-footer'>
          <h1>About Website</h1>
          <div className='card'>
            <div className='card-body'>
              <p class="card-text footer-text">Platform for users to list and browse properties. Real estate platform is a digital space where realtors, 
              home sellers, and home buyers can get in touch to make a purchase or rent contract for a real estate item. 
              Property management websites are all about homeowners. They're in the driving seat and can fully manage their property and potential customers. 
              Usually, websites for property management are focused on residential and commercial properties. </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
