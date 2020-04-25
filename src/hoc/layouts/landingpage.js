import React from 'react';
import './landingpage.css'
// import Banner from '../../components/banner'
// import Name from '../../components/companyName'
import ZipBox from '../../containers/zipbox'
// import InfoBox from '../../containers/infobox';
import Footer from '../../containers/footer'

function LandingPage() {
  return (

    <div style={{ paddingBottom: 60 }}>
      <ZipBox />
      <Footer />
    </div>
  );
}
export default LandingPage;

// ouluxx@0.1.0 start /mnt/d/Users/2kenchill/Desktop/work/Ouluxx
// > react-scripts start