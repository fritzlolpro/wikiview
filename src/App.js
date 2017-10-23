import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchString: ' ',
      header: [],
      description: [],
      link: [],
      results: []
    }
  }

  update(e) {
    this.setState({searchString: e.target.value})
    this.inputChanged(e.target.value)
  }

  inputChanged(string) {
    const issues = [];

    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&redirects=return&origin=*&search=${string}`).then((blob) => blob.json()).then((json) => {
      issues.push(...json)
      this.setState({header: issues[1], description: issues[2], link: issues[3], results: issues})
    })
  }

  render() {
    const results = this.state.header
    let list = []
    if (results) {
      list = results.map((item, key) => <ResultPlate
        key={key}
        header={item}
        description={this.state.description[key]}
        link={this.state.link[key]}/>);
    }
    return (
      <div className="App">
        <StyledSearch update={this
          .update
          .bind(this)}/>
        <div>{list}</div>
      </div>
    );
  }
}

function ResultPlate(props) {
  return (
    <Plate>
      <div className='header'>
        <Title>{props.header}</Title>
      </div>
      <div className='description'>
        <Text>{props.description}</Text>
      </div>
      <div className='link'>
        <Link>
          <a href={props.link}>{props.link}</a>
        </Link>
      </div>
    </Plate>
  )
}

const Search = (props, className) => <input
  type='text'
  placeholder='Search Wiki'
  className={props.className}
  onChange={props.update}/>
const StyledSearch = styled(Search)`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 0.5em;
  margin: 0.2em;
  margin-top: 34px;
  transition: 0.3s;
  border-radius: 5px;
  padding: 16px 16px;
  width: 50%;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-family: Roboto Slab;
  letter-spacing: .01rem;
  font-weight: 900;
  font-style: normal;
  line-height: 1.58;
  font-size: 24px;
  text-transform: uppercase;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  &::placeholder {
    opacity: 0.5;
    font-weight: 300;
  }
`;

const Plate = styled.div `
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: #F5F5F5;
  transition: 0.3s;
  border-radius: 5px;
  padding: 12px 16px;
  width: 50%;
  margin: 0 auto;
  font-family: Roboto Slab;
  margin-top: 24px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`
const Title = styled.h1 `
  font-size: 48px;
  color: mediumseagreen;
  letter-spacing: .01rem;
  font-weight: 900;
  font-style: normal;
  line-height: 1.58;
  text-transform: uppercase;

`
const Text = styled.p `
 text-align: left;
 font-size: 24px;
 letter-spacing: .01rem;
 line-height: 1.18;

`
const Link = Text.extend `
  margin-top: 12px;d
  margin-bottom: 8px;
  word-break: break-all;
`

export default App;
