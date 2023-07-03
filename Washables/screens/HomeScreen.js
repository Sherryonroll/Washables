import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'
import Carousel from '../components/Carousel'

import Services from '../components/Services'
import DressItem from '../components/DressItem'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../ProductReducer'
import { useNavigation } from '@react-navigation/native'
import { collection, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart)
  const [items, setItems] = useState([])
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0)
  const navigation = useNavigation()
  console.log(cart)

  const product = useSelector((state) => state.product.product)
  const dispatch = useDispatch()
  useEffect(() => {
    if (product.length > 0) return

    const fetchProducts = async () => {
      const colRef = collection(db, 'types')
      const docsSnap = await getDocs(colRef)
      docsSnap.forEach((doc) => {
        items.push(doc.data())
      })
      items?.map((service) => dispatch(getProducts(service)))
    }
    fetchProducts()
  }, [])
  console.log(product)
  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
      name: 'shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
      name: 'T-shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
      name: 'dresses',
      quantity: 0,
      price: 10,
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
      name: 'jeans',
      quantity: 0,
      price: 10,
    },
    {
      id: '14',
      image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
      name: 'Sweater',
      quantity: 0,
      price: 10,
    },
    {
      id: '15',
      image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
      name: 'shorts',
      quantity: 0,
      price: 10,
    },
    {
      id: '16',
      image: 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
      name: 'Sleeveless',
      quantity: 0,
      price: 10,
    },
  ]
  return (
    <>
      <ScrollView
        style={{ backgroundColor: '#212A3E', flex: 1, marginTop: 50 }}
      >
        {/* Location and Profile */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          <MaterialIcons name="wash" size={24} color="#87CEEB" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#F1F6F9' }}>
              Washables
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={{ marginLeft: 'auto', marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri:
                  'https://lh3.googleusercontent.com/ogw/AOLn63Eq1keyPyWcs66d81DeObzxBjUVbAHW1v1lW4hMrg=s32-c-mo',
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}

        {/* Services Component */}
        <Services />

        {/* Render all the Products */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: '#212A3E',
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ backgroundColor: '#394867' }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
              {cart.length} items | $ {total}
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('PickUp')}
            style={{ background: '#394867' }}
          >
            <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
