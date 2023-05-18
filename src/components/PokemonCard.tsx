import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/core'

interface Props {
    pokemon: SimplePokemon
}

const windowsWidth = Dimensions.get('window').width

export const PokemonCard = ( { pokemon }: Props) => {

    const navigation = useNavigation()

    const [bgColor, setBgColor] = useState<any>('grey')
    const isMounted = useRef(true)

    useEffect(() => {
        const url = pokemon.picture

        if(!isMounted.current) return
        
        ImageColors.getColors(url, {
          fallback: 'grey',
          cache: true,
          key: url,
        }).then(colors => setBgColor(colors.platform === 'android' ? colors.dominant : 'grey'))

        return () => {
            isMounted.current = false
        }
      }, [])

  return (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={ 
            () => navigation.navigate('PokemonScreen' as never, 
                { simplePokemon: pokemon, color: bgColor } as never )
        }
    >
        <View style={{
            ...styles.cardContainer,
            width: windowsWidth * 0.4,
            backgroundColor: bgColor
        }}>
            <View>
                <Text style={styles.name}>
                    {pokemon.name}
                    {'\n#' + pokemon.id}
                </Text>
            </View>
            <View style={styles.pokebolaContainer}>
                <Image 
                    source={ require('../assets/pokebola-blanca.png')}
                    style={styles.pokebola}
                />
            </View>
            <FadeInImage 
                style={ styles.pokemonImage} 
                uri={ pokemon.picture }
            />
            
        </View>
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    },
    name:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola:{
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25
    }, 
    pokemonImage:{
        width: 120,
        height: 120,
        position: 'absolute',
        bottom: -5,
        right: -8
    },
    pokebolaContainer:{
        borderStartColor: 'blue',
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
})