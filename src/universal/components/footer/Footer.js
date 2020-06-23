import * as React from 'react';

/* eslint-disable */
class Footer extends React.Component {
    render() {
        // FIX FOR - Lazy loading working only when user scroll down till the footer in mobile[SPD-2999]
        return (
            <div id="footer">
                <div className="bg-dark">
                    <div className="container-fluid footer text-white">
                        <div className="row mt-0 mr-0 ml-0 ">
                            <div className="col-md-2 col-sm-12 p-0">SiteMap</div>
                            <div className="col-md-2 col-sm-12 p-0">Privacy Policy</div>
                            <div className="col-md-2 col-sm-12 p-0">About Us</div>
                            <div className="col-md-2 col-sm-12 p-0">FAQs</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;
