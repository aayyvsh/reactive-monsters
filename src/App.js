import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './App.css';

function App() {
  
  const [pokelist, setPokelist] = useState([]);
  const [todisplay, setTodisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [pokedetails, setPokedetails] = useState({ name: "...", sprites: [] });

  const getPokemon = e => {
    axios.get("http://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(res => {
      console.log(res.data.results);
      setPokelist(res.data.results);
      setTodisplay(res.data.results);
    })
    .catch(err => console.log(err));
  }

  const getDetails = pkmn => {
    console.log(pkmn);
    axios.get(pkmn.url)
    .then(res => {
      console.log(res.data.name);
      setPokedetails(res.data);
    })
    .catch(err => console.log(err));
  }

  useEffect( () => {
    getPokemon();

  }, []);

  useEffect( () => {
      setTodisplay(pokelist.filter(p => p.name.includes(search)));
  }, [search]);

  return (
    <div className="container">
      <div className="jumbotron">
        <h3>Pokemon Are Neat</h3>
      </div>
      {/* <button className="btn btn-primary" onClick={getPokemon}>Get PKMN</button> */}


      <div className="row">

        <div className="col-sm-8">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="search" onChange={e => setSearch(e.target.value)} />
        </div>       
        <ul className="list-group is-scrollable">
          {todisplay.map( (pkmn, i) =>
          <li key={i} className="list-group-item" onClick={e => getDetails(pkmn)}>{pkmn.name}</li>          
          )}
        </ul>
      </div> 
      <div className="col-sm-4">
        <div className="card">
          <div className="card-header bg-dark text-light">{pokedetails.name}</div>
          <div className="card-body">
            <img src={pokedetails.sprites.front_default} width="225px"/>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
