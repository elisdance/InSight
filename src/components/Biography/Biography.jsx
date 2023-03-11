import React, { Component } from 'react';
import './sass/Biography.scss';

class Biography extends Component {
  constructor() {
    super();
    this.state = {
      headers: [],
      data: [
        { id: 1, year: 1955, event: 'Year of birth' },
        { id: 2, year: 1975, event: 'Founded Microsoft' },
        { id: 3, year: 1986, event: 'Becoming billionare' },
        { id: 4, year: 1994, event: 'Global health programs' },
        { id: 5, year: 1994, event: 'Getting married' },
        { id: 6, year: 1999, event: 'Learning Foundation' },
        { id: 7, year: 2017, event: '"Smart city" in Arizona' },
        { id: 8, year: 2014, event: 'Charitable work' },
        { id: 9, year: 2012, event: 'Universal flu vaccine' }
      ],
      activeList: '',
      next_id: 10,
      sortBy: null,
      activeItem: null,
      isActive: '',
      isLoaded: false,
      isError: false,
    };
    this.inputValue = React.createRef();
    this.handleChange = this.handleChange.bind(this)
  }

  handleSort = (key) => {
    const data = this.state.data.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      else if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
    return (
      this.setState({
        data,
        sortBy: key,
      }))
  };

  bubbleSort = (key) => {
    const data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j][key] > data[j + 1][key]) {
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }
    this.setState({ data })
  }

  addData = () => {
    const newData = {
      id: this.state.next_id,
      year: parseInt(this.state.year),
      event: this.state.event
    }
    this.setState(({ data }) => ({ data: [...data, newData] }));
    this.setState({ next_id: this.state.next_id + 1 });
  }

  deleteData = id => {
    const data = this.state.data.filter((item) => item.id !== id);
    this.setState({ data })
  }
  addHeader = (key) => {
    const newHeader = this.state.header;
    const data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      data[i][key] = '';
    }
    this.setState(({ headers }) => ({ headers: [...headers, newHeader] }))
    this.setState({ data });
  }
  deleteHeader = (id) => {
    const headers = this.state.headers.filter((item, index) => index !== id);
    this.setState({ headers });
  }
  addToObject = () => {
    const value = this.inputValue.current.value;
    const updatedObject = [...this.state.data, value];
    this.inputValue.current.value = '';
    this.setState(({ data }) => ({ data: [...data, updatedObject] }));
  };
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    let newActiveList = this.state.activeList;

    if (event.keyCode === 38) {
      newActiveList = 'active';
      event.preventDefault();
    } else if (event.keyCode === 40) {
      newActiveList = '';
      event.preventDefault();
    }
  
    this.setState({ activeList: newActiveList });
  };
  handleClick = (index) => {
    let newActiveItem, newIsActive;
  
    if (index === this.state.activeItem) {
      newActiveItem = null;
      newIsActive = '';
    } else {
      newActiveItem = index;
      newIsActive = 'active';
    }
    this.setState({ activeItem: newActiveItem, isActive: newIsActive });
  }
  onDragStart= (event, id) => {

    event.dataTransfer.setData('drag', id);
  }
  onDragOver = (event) => {
    event.preventDefault();
  }
  onDrop = (event, id) => {
    event.preventDefault();
    const dragIndex = this.state.data.findIndex((item) => item.id === event.dataTransfer.getData('drag', id));
    const dropIndex = this.state.data.findIndex((item) => item.id === id);
    const newData = [...this.state.data];
    const draggedItem = newData[dragIndex];
    newData.splice(dragIndex, 1);
    newData.splice(dropIndex,0,draggedItem);
    this.setState({ data: newData });
  }

  render() {
    const { data, headers } = this.state;
    return (
      <div className='block'>
        <h2>Bill Gates' Life Events</h2>
        <table className={this.state.activeList}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} onClick={() => this.handleSort(header)} className="flex"><span>{header}</span><i className="fa-solid fa-trash grey" onClick={() => this.deleteHeader(index)}></i></th>
              ))}

            </tr>
          </thead>
          <tbody >
            {data.map((bio) => (
              <tr
                key={bio.id}
                className={this.state.isActive}
                onClick={() => this.handleClick(bio.id)}
                draggable={true}
                onDragStart={(event) => this.onDragStart(event, bio.id)}
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={(event) => this.onDrop(event, bio.id)}
              >
                {headers.map((header,index) => (
                  <td key={index}><input type="text" ref={this.inputValue} id={bio.id} defaultValue={bio[header] || ''} />
                  </td>
                ))}
                <th><i className="fa-solid fa-trash grey" onClick={() => this.deleteData(bio.id)}></i>
                <i className="fa-solid fa-circle-check grey" key={headers.id} onClick={() => this.addToObject()}></i></th>
                
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex margin'>
          <input type="text" placeholder="year:" name='year' value={this.state.year || ''} onChange={this.handleChange}/>
          <input type="text" value={this.state.event || ''} name='event' onChange={this.handleChange} placeholder="event:" />
          <i className="fa-solid fa-circle-plus grey" onClick={this.addData}></i>
        </div>
        <div className='flex margin'>
          <input type="text" placeholder="name of header:" value={this.state.header || ''} name='header' onChange={this.handleChange} />
          <i className="fa-solid fa-circle-plus grey" onClick={this.addHeader}></i>

        </div>
      </div>
    )
  }
}

export default Biography