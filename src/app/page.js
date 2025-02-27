"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Pokémon Explorer</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mx-auto block p-2 mb-6 border rounded-lg"
      />

      {loading ? (
        <p className="text-center">Loading Pokémon...</p>
      ) : filteredPokemon.length === 0 ? (
        <p className="text-center">No Pokémon found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemon.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto"
                />
                <p className="text-center capitalize mt-2">{pokemon.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}