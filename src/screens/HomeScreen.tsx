import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { FadeInImage } from '../components/FadeInImage'
import { PokemonCard } from '../components/PokemonCard'

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets()
    const { simplePokemonList, loadPokemons} = usePokemonPaginated()

  return (
    <>
        <Image style={ styles.pokeballBG } source={require('../assets/pokebola.png')}/>
        <View style={{ alignItems: 'center'}}>
            <FlatList 
                data={simplePokemonList}
                keyExtractor={ (pokemon) => pokemon.id }
                renderItem={ ({ item }) => (
                    <PokemonCard pokemon={item}/>
                )}
                //header
                ListHeaderComponent={(
                    <Text style={{ 
                        ...styles.title,
                        ...styles.globalMargin,
                        marginTop: top + 20}}>
                        Pokedex
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                //infinity scroll
                onEndReached={ loadPokemons }
                onEndReachedThreshold={ 0.4 }
                //loading footer
                ListFooterComponent={(
                    <ActivityIndicator
                        style={{height: 100}}
                        size={ 20 }
                        color='grey'
                    />
                )}
            
            />
        </View>
        
    </>
  )
}