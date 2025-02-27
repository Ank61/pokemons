"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
export default function PokemonDetail() {
  const params = useParams();
  const id = params?.id;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Pokémon not found");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError((err).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4 text-center">Loading...</div>;
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 text-center">
        {error || "Pokémon not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center capitalize mb-6">{pokemon.name}</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto"
        />
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Types</h2>
          <p>{pokemon.types.map((t) => t.type.name).join(", ")}</p>

          <h2 className="text-2xl font-semibold mt-4">Abilities</h2>
          <p>{pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>

          <h2 className="text-2xl font-semibold mt-4">Stats</h2>
          <ul>
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-4">Moves</h2>
          <p>{pokemon.moves.slice(0, 5).map((m) => m.move.name).join(", ")}...</p>
        </div>
      </div>
    </div>
  );
}