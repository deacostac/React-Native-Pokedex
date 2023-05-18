import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParams } from '../navigation/navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../components/FadeInImage'
import { usePokemon } from '../hooks/usePokemon'
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ navigation, route }: Props) => {

  const { simplePokemon, color } = route.params
  const { name, id, picture } = simplePokemon
  const { top } = useSafeAreaInsets()
  const { isLoading, pokemon } = usePokemon(id)
  return (
    <View style={{flex: 1}}>
        {/* Header Container */}
        <View style={{
          ...styles.headerContainer,
          backgroundColor: color
        }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{...styles.backButton, top: top + 20}}
            onPress={() => navigation.pop()}
            >
            <Icon 
              name='arrow-back-outline'
              color='white'
              size={ 35 }
            />
          </TouchableOpacity>

          {/* Pokemon Name */}
          <Text style={{...styles.pokemonName, top: top + 40}}>
            { name }
          </Text>
          <Text style={{...styles.pokemonName, top: top + 30, fontSize: 25}}>
            #{id}
          </Text>
          <Image 
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeball}
            
          />
          <FadeInImage
            uri={ picture }
            style={styles.pokemonImage}
          />
        </View>
        {/* Pokemon Details */}
        {
            isLoading ?
            <View>
              <ActivityIndicator 
                color={color}
                size={ 50 }
                style={styles.loading}
              />
          </View>
          : <PokemonDetails pokemon={pokemon}/>
           }
    </View>
    
  )
}

const styles = StyleSheet.create({
  headerContainer:{
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 20
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width:250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage:{
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})