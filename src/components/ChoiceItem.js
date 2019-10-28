import React, {Component} from 'react';

export default class ChoiceItem extends Component {

   render() {
      const {item, setSelected}=this.props;
      return (
         <div className={"choice-item " + (item.selected ? "selected" : "")} onClick={() => {setSelected(item.value)}}>
            <span>{item.title}</span>
         </div>
      )
   }
}