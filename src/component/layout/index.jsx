import React from 'react';
import NavTop from '../nav-top/index.jsx';
import NavSide from '../nav-side/index.jsx';
class LayoutComponent extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <NavTop />
        <NavSide />
      </div>
    )
  }
}

export default LayoutComponent