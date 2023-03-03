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
      next_id: 10,
      sortBy: null,
    };
    this.inputValue = React.createRef();
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
    this.setState({ next_id: this.state.next_id + 1});
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
    const value = this.inputItemValue.current.value;
    const updatedObject = [...this.state.data, value];
    this.inputValue.current.value = '';
    this.setState(({ data }) => ({ data: [...data, updatedObject] }));
  };
  handleChange(event) {
    const {name,value} = event.target
    this.setState({ [name]:value});
  }
  render() {
    const { data, headers } = this.state;
    return (
      <div className='block'>
        <h2>Bill Gates' Life Events</h2>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} onClick={() => this.handleSort(header)} className="flex"><span>{header}</span><i className="fa-solid fa-trash grey" onClick={() => this.deleteHeader(index)}></i></th>
              ))}

            </tr>
          </thead>
          <tbody>
            {data.map((bio) => (
              <tr key={bio.id} >
                {headers.map((header) => (
                  <td><input type="text" ref={this.inputValue} value={bio[header]} />
                  </td>
                ))}
                <i class="fa-solid fa-trash grey" onClick={() => this.deleteData(bio.id)}></i>
                <i class="fa-solid fa-circle-check grey" key={headers.id} onClick={() => this.addToObject()}></i>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex margin'>
          <input type="text"  placeholder="year:" name='year' value={this.state.year} onChange={(evt) => this.handleChange(evt)}/>
          <input type="text" value={this.state.event} name='event' onChange={(evt) => this.handleChange(evt)} placeholder="event:" />
          <i class="fa-solid fa-circle-plus grey" onClick={this.addData}></i>
        </div>
        <div className='flex margin'>
          <input type="text" placeholder="name of header:" value={this.state.header} name='header' onChange={(evt) => this.handleChange(evt)}/>
          <i class="fa-solid fa-circle-plus grey" onClick={this.addHeader}></i>

        </div>
      </div>
    )
  }
}

export default Biography