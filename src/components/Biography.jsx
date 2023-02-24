import React, { Component } from 'react';
import './sass/biography.scss';

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
    this.inputYear = React.createRef();
    this.inputEvent = React.createRef();
    this.inputHeader = React.createRef();
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
    this.setState({ data: data });
  }

  addData = () => {
    const newData = {
      id: this.state.next_id,
      year: parseInt(this.inputYear.current.value),
      event: this.inputEvent.current.value
    }
    const updatedData = [...this.state.data, newData];
    this.setState({ data: updatedData });
    this.setState({ next_id: this.state.next_id + 1 });
    this.inputYear.current.value = '';
    this.inputEvent.current.value = '';
  }

  deleteData = id => {
    const data = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: data });
  }
  addHeader = (key) => {
    const newHeader = this.inputHeader.current.value;
    const updatedHeaders = [...this.state.headers, newHeader]
    this.inputHeader.current.value = '';
    const data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      data[i][key] = '';
    }
    this.setState({ headers: updatedHeaders, data: data })
  }
  deleteHeader = (id) => {
    const headers = this.state.headers.filter((item, index) => index !== id);
    this.setState({ headers: headers });
  }
  addToObject = () => {
    const value = this.inputItemValue.current.value;
    const updatedObject = [...this.state.data, value];
    this.inputValue.current.value = '';
    this.setState({ data: updatedObject });
  };
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
                    <i class="fa-solid fa-trash grey" onClick={() => this.deleteData(bio.id)}></i></td>
                ))}
                <i class="fa-solid fa-circle-check grey" key={headers.id} onClick={() => this.addToObject()}></i>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex margin'>
          <input type="text" ref={this.inputYear} placeholder="year:" />
          <input type="text" ref={this.inputEvent} placeholder="event:" />
          <i class="fa-solid fa-circle-plus grey" onClick={this.addData}></i>
        </div>
        <div className='flex margin'>
          <input type="text" ref={this.inputHeader} placeholder="name of header:" />
          <i class="fa-solid fa-circle-plus grey" onClick={this.addHeader}></i>

        </div>
      </div>
    )
  }
}

export default Biography