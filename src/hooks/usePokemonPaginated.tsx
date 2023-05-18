import { useEffect, useRef, useState } from "react"
import { pokemonApi } from "../api/pokemonApi"
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterface';

export const usePokemonPaginated = () => {

    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([])
    const [ isLoading, setIsLoading ] = useState<Boolean>(true)
  
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')

    const loadPokemons = async() => {
        setIsLoading(true)
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current)
        nextPageUrl.current = (resp.data.next)
        pokemonToSimplePokemon(resp.data.results)
        setIsLoading(false)
    }

    const pokemonToSimplePokemon = ( pokemonList: Result[]) => {
        
        const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
            const urlParts = url.split('/')
            const id = urlParts[urlParts.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            
            return {id, picture, name}
        })

        setSimplePokemonList([...simplePokemonList, ...newPokemonList])
        
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }

}
