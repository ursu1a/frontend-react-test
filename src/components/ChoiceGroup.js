import React, {Component} from 'react';
import ChoiceItem from "./ChoiceItem";

export default class ChoiceGroup extends Component {
   state={
      selected: null
   };

   setSelected=value => {
      this.setState({selected: value}, () => {
         this.props.onSelect(value);
      });
   };

   render() {
      const {items, defaultValue}=this.props;
      const {selected}=this.state;
      return (
         <div className="choice-group">
            {items.map((item, key) => (
               <ChoiceItem key={key} item={{...item, selected: item.value===selected || item.value===defaultValue}} setSelected={this.setSelected}/>
            ))}
         </div>
      )
   }
}