import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  fetch = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(
        response => {
          response.json().then((data) => {
            this.setState({
              pets: data
            })
          })
        }
      )
    } else {
      fetch('/api/pets?type=' + this.state.filters.type)
      .then(
        response => {
          response.json().then((data) => {
            this.setState({
              pets: data
            })
          })
        }
      )
    }
  }

  onAdoptPet = (id) => {
    this.state.pets.forEach(function(pet) {
      if (pet.id == id) {
        pet.isAdopted = true
      }
    })
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={event => this.fetch()}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={event => this.onAdoptPet(event)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
