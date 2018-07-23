import React, { Component } from 'react';
import ShowHelp from './ShowHelp';
import mtg from 'mtgsdk';
export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.handleName = this.handleName.bind(this);
        this.handleSet = this.handleSet.bind(this);
        this.handleColors = this.handleColors.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.showHelp = this.showHelp.bind(this);
        this.state = {
            cards: [],
            value0: '',
            value1: '',
            value2: '',
            value3: '',
            setList: [],
            showHelp: false,
        }
    }
    handleName(event) {
        this.setState({value0: event.target.value});
    }
    handleSet(event) {
        this.setState({value1: event.target.value});
    }
    handleColors(event) {
        this.setState({value2: event.target.value});
    }
    handleType(event) {
        this.setState({value3: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    resetSearch() {
        const cardName  = this.refs.name;
        const cardSet  = this.refs.set;
        const cardColors  = this.refs.colors;
        const cardType  = this.refs.type;
        this.setState({value0: '', value1: '', value2: '', value3: ''});
        cardName.value = '';
        cardSet.value = '';
        cardColors.value = '';
        cardType.value = '';
    }
    getCards = ()  => {
        
        this.setState({cards: []})
        fetch(mtg.card.where({ name: this.state.value0, set: this.state.value1, colors: this.state.value2, type: this.state.value3 })
            .then(cards => {
                console.log("Cards",cards, cards.colors) // "Squee, Goblin Nabob"
                this.setState({cards: cards});
                console.log(this.state);
                
            }))
        
        
    }
     getSets = () => {
         let sets = [];
         fetch(mtg.set.all({ name: '' })
         .on('data', set => {
            sets.push(set)
            this.setState({setList: sets});
            console.log(this.state.setList);
         }))                 
    }
    showHelp = () => {
        this.setState({showHelp: !this.state.showHelp})
        console.log(this.state.showHelp)
    }

    componentWillMount = () => {
        this.getSets() 
    }
    
    render() {
        let trueCards = this.state.cards.filter((card, i) => card.imageUrl && card.layout == 'normal' || 'double-sided'&& card.layout !== 'plane' && card.set !== 'VMA').map((card, i) => {
            return <img className="card" key={i} src={card.imageUrl} alt=""/>
        })
        

                
        //const setAbbr = this.state.setList.map((set) => {
        //    return <li><strong>Set Name:</strong> <em className="bigClue">{set.name}</em> - <strong>Code to Use:</strong> <em className="bigClue">{set.code}</em></li>
       // })  
        return (
        <React.Fragment>
            <div className="App">
                <h1 className="title">MTG Card Search</h1>
                <h3>Search by name, set code, colors, and also by card type.<br/> Type examples: Artifact, Creature, Land, Enchantment, Planeswalker and more<br/>
                    Name Example >> Tolsimir Wolfblood <br/>
                    There should be no spaces in between colors but each color addition should be separated by a comma.<br/> 
                    Colors Example - Colors may be entered alone or combined>> Blue,White,Black,Green,Red <br/>
                    Type Example >> Creature<br/>
                    Full Query Example Below<br/>Name: Tolsimir Wolfblood <br/>Set: RAV <br/>Colors: Green,White<br/>Type: Creature
                    </h3>
                    <p>Clicking the Show Set Codes button below reveals a list of set names along with their codes to help narrow your search</p>
            </div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label><br/>
                <input ref="name" name="name" onChange={this.handleName} id="nameInput" /><br/>
                <label htmlFor="set">Set</label><br/>
                <input ref="set" name="set" onChange={this.handleSet} id="setInput" /><br/>
                <label htmlFor="colors">Colors</label><br/>
                <input ref="colors" name="colors" onChange={this.handleColors} id="colorsInput" /><br/>
                <label htmlFor="type">Type</label><br/>
                <input ref="type" name="type" onChange={this.handleType} id="typeInput" /><br/><br/>
                <button className="loader" onClick={this.getCards}>Get Cards</button>
                <button className="loader" onClick={this.showHelp}>Show Set Codes</button>
                <a href='/'><button onClick={this.resetSearch} className="loader">Clear Fields</button></a>
            </form>
            <div className="App">
                {trueCards} 
                
                { this.state.showHelp && <ShowHelp/>} 
            </div>
            { this.state.cards.length > 0 && <a href='/'><button onClick={this.resetSearch} className="loader">Reset Search</button></a>}
            
            
            
            </React.Fragment>
        )
    }
}
