import React, { Component, Fragment } from 'react';
import CheckboxList from "./CheckboxList";
import { css } from 'emotion'
import posed, {PoseGroup} from 'react-pose';
import colors from '../../base-styles/colors'
class TabView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          activeTabId: 0,
          listOpen: false
        };
    
      }
 
 
 
   handleTabchange =  (evt,e) => {
    evt.stopPropagation()
    
           var cardSuitArray = Object.keys(this.props.tabs)
              var index = cardSuitArray.indexOf(e)
             
              
                      this.setState({
                          activeTabId: index,
                          listOpen: false
                      })
                         this.props.handleTabchange(index);
     

  
  }
   createTab = (cardSuit) =>  (
    <CheckboxList style={{display : "flex", flexDirection : "column"}} cardSuit={cardSuit} cards={this.props.tabs[cardSuit]}/>
   )
 
   populateTabs = () => {
       // gives names of tabs
       var cardSuitArray = Object.keys(this.props.tabs) 
       
        var currentIndex = this.state.activeTabId

        //get current tab
        var tabs = {...this.props.tabs}



       // Gives array placement number
    //    var indexNumber = cardSuitArray.indexOf(card)
      
       
    Object.keys(this.props.tabs).map((cardSuit,index) => (
        // console.log("current tab:" ,currentIndex, "index:", index)
         currentIndex === index ? this.createTab(cardSuit) : ""
    )
         

    
    
    )
   }
//NOT IMPLEMENTED YET: clicking outside menu should close menu, but this is not working yet, you have to click inside the menu to close it
   toggleList = () => {

   this.setState(prevState =>({
     listOpen: !prevState.listOpen
   }))}
   render() {
    //  Example on POSE div
    const Menu = posed.div({
      enter: { x: "0%",  visible: {
        opacity: 1,
        transition: { duration: 300 }
      }},
      exit: { x: "200%",  visible: {
        opacity: 0},
        transition: { duration: 150 }
      } 
    });
     let{ listOpen } = this.state
    return (
      <div className={container()}>
          <div  style={{ display: "flex"}}>
          <div className="dd-wrapper" >
            <div className="dd-header" onClick={ () => this.toggleList()}>
            {Object.keys(this.props.tabs).map((cardSuit,index) => (
              index === this.state.activeTabId &&
                  <h2 key={index} className="dd-header-title" >{cardSuit}</h2>
                

            ))}
           
            </div>
            <PoseGroup>
           { listOpen &&
           <Menu className="menu" key="menu">
           <ul className="dd-list" onClick={ () => this.toggleList()}>
            {Object.keys(this.props.tabs).map((cardSuit,index) => 
   
         
          <li  className={ index === this.state.activeTabId ? "dd-list-item current-selected-suit" : "dd-list-item" } key={index} onClick={ (event) => this.handleTabchange(event,cardSuit)} >{cardSuit}</li>
          
          
          )}
          </ul>
          </Menu>
            }
             </PoseGroup>
          </div>
       
            </div>
       
          
         
     
  
    
      </div>
    );
  }
}
const container = () => css `
  display:flex;
  justify-content: center;
  
  .current-selected-suit{
    background-color:${colors.tapestry};
  }
  ul{
  
    //viewheight and viewwidth fefers to device height and width
    width: 100vw;
    height: 100vh;
    position:relative;
    right:0;
    background-color: ${colors.black};
    list-style:none;
    padding-top: 0.5rem;
    border-top: 1px solid ${colors.tapestry};
    li{
      border-bottom: 1px solid ${colors.tapestry};
      padding-bottom: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      cursor: pointer;
      &:hover{
        background-color: ${colors.tapestry};
      }
    }
    &:hover{
      background-color: ${colors.tapestry};
    }
  }
.dd-list-item{
}
.menu{
  margin-top: -50px;
  position:absolute;
  width:100%;
  left:0;
  .dd-list{display:flex;
    margin: 0;
  padding:0;
  background-color: ${colors.black};
  flex-direction:column;
  width:100%;
list-style: none;}
}
`
const mapStateToProps = (state) => ({
  // ...
});




export default TabView;